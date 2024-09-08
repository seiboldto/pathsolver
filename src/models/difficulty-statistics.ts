import { PresetDifficulty } from "~src/level-gen";

export type DifficultyStatistics = {
  gamesPlayed: number;
  currentStreak: number;
  maxStreak: number;
  perfectGames: number;
  lastPlayedTimestamp: null | number;
};

export type UpdatedStatistics = {
  difficulty: PresetDifficulty;
  gamesPlayed: true;
  currentStreak: boolean;
  maxStreak: boolean;
  perfectGames: boolean;
};

export const INITIAL_DIFFICULTY_STATISTICS: DifficultyStatistics = {
  gamesPlayed: 0,
  currentStreak: 0,
  maxStreak: 0,
  perfectGames: 0,
  lastPlayedTimestamp: null,
};
