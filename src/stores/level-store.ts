import { v4 as uuid } from "uuid";
import { create } from "zustand";

import { type Board } from "~src/levels";
import { type Node } from "~src/models";

import { createSelectors } from "./store-utils";

type LevelStore = {
  nodes: Node[];
  actions: {
    setInitialNodes: (board: Board) => void;
  };
};

const levelStore = create<LevelStore>((set) => ({
  nodes: [],
  actions: {
    setInitialNodes: (board) =>
      set({
        nodes: board.nodes.map((n, i) => ({
          value: n,
          id: uuid(),
          row: Math.floor(i / board.difficulty.boardSize),
          column: i % board.difficulty.boardSize,
        })),
      }),
  },
}));

export const useLevelStore = createSelectors(levelStore);
