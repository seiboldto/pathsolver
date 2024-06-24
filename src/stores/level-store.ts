import { create } from "zustand";

import type { Level } from "~src/levels";
import type { LevelState } from "~src/models";

import { createSelectors } from "./store-utils";

type LevelStore = {
  activeLevelState: LevelState | null;
  actions: {
    setActiveLevel: (level: Level) => void;
    setActiveLevelState: (state: LevelState) => void;
  };
};

const levelStore = create<LevelStore>((set) => ({
  activeLevelState: null,
  actions: {
    setActiveLevel: (level) => set({ activeLevelState: { level } }),
    setActiveLevelState: (state) => set({ activeLevelState: state }),
  },
}));

export const useLevelStore = createSelectors(levelStore);
