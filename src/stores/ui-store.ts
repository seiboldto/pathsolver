import { create } from "zustand";

import { type SelectableDifficulty } from "~src/models";

import { createSelectors } from "./store-utils";

type UiStore = {
  selectedDifficulty: SelectableDifficulty;
  actions: {
    selectDifficulty: (difficulty: SelectableDifficulty) => void;
  };
};

const uiStore = create<UiStore>((set) => ({
  selectedDifficulty: "normal",
  actions: {
    selectDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
  },
}));

export const useUiStore = createSelectors(uiStore);
