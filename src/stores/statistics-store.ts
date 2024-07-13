import { create } from "zustand";
import { persist } from "zustand/middleware";

import { PresetDifficulty } from "~src/levels";
import {
  type DifficultyStatistics,
  INITIAL_DIFFICULTY_STATISTICS,
} from "~src/models";

import { createSelectors } from "./store-utils";

type StatisticsStore = {
  stats: Record<PresetDifficulty, DifficultyStatistics>;
  actions: null;
};

const statisticsStore = create(
  persist<StatisticsStore, [], [], Pick<StatisticsStore, "stats">>(
    () => ({
      stats: {
        normal: INITIAL_DIFFICULTY_STATISTICS,
        hard: INITIAL_DIFFICULTY_STATISTICS,
        extreme: INITIAL_DIFFICULTY_STATISTICS,
      },
      actions: null,
    }),
    {
      name: "statistics-store",
      partialize: (state) => ({ stats: state.stats }),
    }
  )
);

export const useStatisticsStore = createSelectors(statisticsStore);
