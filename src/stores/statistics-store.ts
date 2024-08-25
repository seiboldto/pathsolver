import { create } from "zustand";
import { persist } from "zustand/middleware";

import { PRESET_DIFFICULTIES, type PresetDifficulty } from "~src/level-gen";
import { statsHelpers, STREAK_TIME_IN_MILLISECONDS } from "~src/level-state";
import { VERSIONS } from "~src/lib";
import {
  type DifficultyStatistics,
  INITIAL_DIFFICULTY_STATISTICS,
} from "~src/models";

import { createSelectors } from "./store-utils";

type StatisticsStore = {
  stats: Record<PresetDifficulty, DifficultyStatistics>;
  streakTimeouts: Map<PresetDifficulty, NodeJS.Timeout>;
  actions: {
    updateStreaksOnAppLoad: () => void;
    invalidateStreakTimeout: (difficulty: PresetDifficulty) => void;
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
          const { stats, actions } = get();

          const timestamp = Date.now();
          const updatedStats = statsHelpers.updateStats({
            stats: stats[difficulty],
            timestamp,
            isPerfectGame,
          });

          set({
            stats: {
              ...stats,
              [difficulty]: updatedStats,
            },
          });

          if (updatedStats.lastPlayedTimestamp === timestamp)
            actions.invalidateStreakTimeout(difficulty);
        },

        resetStreak: (difficulty) => {
          const { stats } = get();

          set({
            stats: {
              ...stats,
              [difficulty]: { ...stats[difficulty], currentStreak: 0 },
            },
          });
        },

        invalidateStreakTimeout: (difficulty) => {
          const { streakTimeouts, actions } = get();
          const timeout = streakTimeouts.get(difficulty);
          if (timeout) clearInterval(timeout);

          const newTimeout = setTimeout(() => {
            streakTimeouts.delete(difficulty);
            actions.resetStreak(difficulty);
          }, STREAK_TIME_IN_MILLISECONDS);
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
