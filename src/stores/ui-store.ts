import { create } from "zustand";

import { type SelectableDifficulty } from "~src/models";

import { createSelectors } from "./store-utils";

type UiStore = {
  selectedDifficulty: SelectableDifficulty;
  isDeveloperMode: boolean;
  actions: {
    selectDifficulty: (difficulty: SelectableDifficulty) => void;
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
