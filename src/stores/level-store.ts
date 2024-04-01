import { v4 as uuid } from "uuid";
import { create } from "zustand";

import { type Board, type Path as GeneratedPath } from "~src/levels";
import { type Node, type Path } from "~src/models";

import { createSelectors } from "./store-utils";

type LevelStore = {
  nodes: Node[];
  selectedNodes: Node[];
  selectedValue: number;
  invalidNodeID: string | null;
  paths: Path[];
  actions: {
    setInitialState: (board: Board, paths: GeneratedPath[]) => void;
    selectNode: (node: Node, board: Board) => void;
    resetSelectedNodes: () => void;
    setInvalidNode: (id: string) => void;
    resetInvalidNode: () => void;
  };
};

const levelStore = create<LevelStore>((set, get) => ({
  nodes: [],
  selectedNodes: [],
  selectedValue: 0,
  invalidNodeID: null,
  paths: [],
  actions: {
    setInitialState: (board, paths) =>
      set({
        nodes: board.nodes.map((n, i) => ({
          value: n,
          id: uuid(),
          row: Math.floor(i / board.difficulty.boardSize),
          column: i % board.difficulty.boardSize,
        })),
        selectedNodes: [],
        selectedValue: 0,
        paths: paths.map((p) => ({
          id: p.indices.join(","),
          indices: p.indices,
          result: p.result,
          completed: false,
        })),
      }),
    selectNode: (node, board) => {
      const prevSelectedNodes = get().selectedNodes;

      const selectedNodes = [...prevSelectedNodes, node];
      let selectedValue = node.value;
      if (prevSelectedNodes.length > 0) {
        const prevNode = prevSelectedNodes[prevSelectedNodes.length - 1];

        const operation =
          board.edges[
            board.indexOfEdgeBetween(
              node.row * board.difficulty.boardSize + node.column,
              prevNode.row * board.difficulty.boardSize + prevNode.column
            )
          ];

        selectedValue = operation.apply(get().selectedValue, node.value);
      }

      set({ selectedNodes, selectedValue });
    },
    resetSelectedNodes: () => set({ selectedNodes: [], selectedValue: 0 }),
    setInvalidNode: (id) => set({ invalidNodeID: id }),
    resetInvalidNode: () => set({ invalidNodeID: null }),
  },
}));

export const useLevelStore = createSelectors(levelStore);
