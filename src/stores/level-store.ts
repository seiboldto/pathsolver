import { writable } from "svelte/store";

type LevelStore = {
  selectedNodeIndices: number[];
};

export const levelStore = writable<LevelStore>({ selectedNodeIndices: [] });

export const addIndexToSelected = (index: number) => {
  levelStore.update((prev) => ({
    selectedNodeIndices: [...prev.selectedNodeIndices, index],
  }));
};

export const resetSelectedIndices = () =>
  levelStore.set({ selectedNodeIndices: [] });
