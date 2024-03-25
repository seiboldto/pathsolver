import { writable } from "svelte/store";

import { type Node } from "~src/model/Node";

type LevelStore = {
  selectedNodes: Node[];
};

export const levelStore = writable<LevelStore>({ selectedNodes: [] });

export const selectNode = (node: Node) => {
  levelStore.update((prev) => ({
    selectedNodes: [...prev.selectedNodes, node],
  }));
};

export const resetSelectedNodes = () => levelStore.set({ selectedNodes: [] });
