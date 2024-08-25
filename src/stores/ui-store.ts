import { create } from "zustand";

import { PresetDifficulty } from "~src/level-gen";

import { createSelectors } from "./store-utils";

type UiStore = {
  selectedDifficulty: PresetDifficulty;
  isDeveloperMode: boolean;
  actions: {
    selectDifficulty: (difficulty: PresetDifficulty) => void;
    toggleDeveloperMode: () => void;
  };
};

const uiStore = create<UiStore>((set, get) => ({
  selectedDifficulty: "normal",
  isDeveloperMode: false,
  actions: {
    selectDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
    toggleDeveloperMode: () => set({ isDeveloperMode: !get().isDeveloperMode }),
  },
}));

export const useUiStore = createSelectors(uiStore);
