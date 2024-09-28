import { create } from "zustand";
import { persist } from "zustand/middleware";

import { PRESET_DIFFICULTIES, type PresetDifficulty } from "~src/level-gen";
import { statsHelpers } from "~src/level-state";
import { VERSIONS } from "~src/lib";
import {
  type DifficultyStatistics,
  INITIAL_DIFFICULTY_STATISTICS,
  type UpdatedStatistics,
} from "~src/models";

import { createSelectors } from "./store-utils";

type StatisticsStore = {
  stats: Record<PresetDifficulty, DifficultyStatistics>;
  updatedStats: UpdatedStatistics | null;
  streakTimeouts: Map<PresetDifficulty, NodeJS.Timeout>;
  actions: {
    updateStreaksOnAppLoad: () => void;
    invalidateStreakTimeout: (
      difficulty: PresetDifficulty,
      expiresIn: number
    ) => void;
    invalidateAllStreakTimeouts: () => void;
    updateStats: (difficulty: PresetDifficulty, isPerfectGame: boolean) => void;
    resetStreak: (difficulty: PresetDifficulty) => void;
  };
};

const statisticsStore = create(
  persist<StatisticsStore, [], [], Pick<StatisticsStore, "stats">>(
    (set, get) => ({
      stats: {
        normal: INITIAL_DIFFICULTY_STATISTICS,
        hard: INITIAL_DIFFICULTY_STATISTICS,
        extreme: INITIAL_DIFFICULTY_STATISTICS,
      },
      updatedStats: null,
      streakTimeouts: new Map(),
      actions: {
        updateStreaksOnAppLoad: () => {
          const { stats, actions } = get();

          const timestamp = Date.now();
          const streakTimeouts = new Map<PresetDifficulty, NodeJS.Timeout>();

          const createStreakTimeout = (d: PresetDifficulty) => {
            const { lastPlayedTimestamp, currentStreak } = stats[d];
            const state = statsHelpers.getStreakState({
              timestamp,
              lastPlayedTimestamp,
              currentStreak,
            });
            if (state.type !== "idle")
              return setTimeout(() => {
                streakTimeouts.delete(d);
                actions.resetStreak(d);
              }, state.expiresInMs);
            return null;
          };

          PRESET_DIFFICULTIES.map(
            (d) => [d, createStreakTimeout(d)] as const
          ).forEach(([d, t]) => t && streakTimeouts.set(d, t));

          set({ streakTimeouts });
        },

        updateStats: (difficulty, isPerfectGame) => {
          const prev = get();
          const { actions } = prev;
          const stats = prev.stats[difficulty];

          const timestamp = Date.now();
          const updatedStats = statsHelpers.updateStats({
            stats,
            timestamp,
            isPerfectGame,
          });

          set({
            stats: {
              ...prev.stats,
              [difficulty]: updatedStats,
            },
            updatedStats: {
              difficulty,
              gamesPlayed: true,
              perfectGames: isPerfectGame,
              currentStreak: stats.currentStreak !== updatedStats.currentStreak,
              maxStreak: stats.maxStreak !== updatedStats.maxStreak,
            },
          });

          if (updatedStats.lastPlayedTimestamp === timestamp) {
            const streakState = statsHelpers.getStreakState({
              lastPlayedTimestamp: updatedStats.lastPlayedTimestamp,
              timestamp,
              currentStreak: updatedStats.currentStreak,
            });

            if ("expiresInMs" in streakState) {
              actions.invalidateStreakTimeout(
                difficulty,
                streakState.expiresInMs
              );
            }
          }
        },

        resetStreak: (difficulty) => {
          const { stats, updatedStats } = get();

          const newUpdatedStats =
            difficulty === updatedStats?.difficulty ? null : updatedStats;

          set({
            stats: {
              ...stats,
              [difficulty]: { ...stats[difficulty], currentStreak: 0 },
            },
            updatedStats: newUpdatedStats,
          });
        },

        invalidateStreakTimeout: (difficulty, expiresIn) => {
          const { streakTimeouts, actions } = get();
          const timeout = streakTimeouts.get(difficulty);
          if (timeout) clearInterval(timeout);

          const newTimeout = setTimeout(() => {
            streakTimeouts.delete(difficulty);
            actions.resetStreak(difficulty);
          }, expiresIn);
          streakTimeouts.set(difficulty, newTimeout);
        },

        invalidateAllStreakTimeouts: () => {
          const { streakTimeouts } = get();

          const activeTimeouts = Array.from(streakTimeouts.entries());
          activeTimeouts.forEach(([d, t]) => {
            clearInterval(t);
            streakTimeouts.delete(d);
          });
        },
      },
    }),
    {
      name: "statistics-store",
      partialize: (state) => ({ stats: state.stats }),
      version: VERSIONS.STORAGE.STATISTICS,
    }
  )
);

export const useStatisticsStore = createSelectors(statisticsStore);
