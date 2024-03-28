import { create } from "zustand";

import { PresetDifficulty } from "~src/levels";

import { createSelectors } from "./store-utils";

type UiStore = {
  selectedDifficulty:
    | { type: "preset"; difficulty: PresetDifficulty }
    | { type: "custom" };
  actions: {
    selectPresetDifficulty: (difficulty: PresetDifficulty) => void;
    selectCustomDifficulty: () => void;
  };
};

const uiStore = create<UiStore>((set) => ({
  selectedDifficulty: {
    type: "preset",
    difficulty: "normal",
  },
  actions: {
    selectPresetDifficulty: (difficulty) =>
      set({ selectedDifficulty: { type: "preset", difficulty } }),
    selectCustomDifficulty: () =>
      set({ selectedDifficulty: { type: "custom" } }),
  },
}));

export const useUiStore = createSelectors(uiStore);
