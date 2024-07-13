import { type PresetDifficulty } from "~src/levels";

export type SelectableDifficulty = PresetDifficulty | "custom";
export const SELECTABLE_DIFFICULTIES = [
  "normal",
  "hard",
  "extreme",
  "custom",
] as const satisfies SelectableDifficulty[];

export type DifficultyStatistics = {
  gamesPlayed: number;
  currentStreak: number;
  maxStreak: number;
  bestTime: number | null;
};

export const INITIAL_DIFFICULTY_STATISTICS: DifficultyStatistics = {
  gamesPlayed: 0,
  currentStreak: 0,
  maxStreak: 0,
  bestTime: null,
};
