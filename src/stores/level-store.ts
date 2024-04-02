import { v4 as uuid } from "uuid";
import { create } from "zustand";

import { type Board, type Path as GeneratedPath } from "~src/levels";
import { type Node, type Path } from "~src/models";

import { createSelectors } from "./store-utils";

type LevelStore = {
  nodes: (Node | null)[];
  selectedNodes: Node[];
  selectedValue: number;
  invalidNodeID: string | null;
  boardSize: number;
  paths: Path[];
  actions: {
    setInitialState: (board: Board, paths: GeneratedPath[]) => void;
    selectNode: (node: Node, board: Board) => void;
    removeSelectedNodes: () => void;
    setInvalidNode: (id: string) => void;
    resetInvalidNode: () => void;
  };
};

const levelStore = create<LevelStore>((set, get) => ({
  nodes: [],
  selectedNodes: [],
  selectedValue: 0,
  invalidNodeID: null,
  boardSize: 0,
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
        boardSize: board.difficulty.boardSize,
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
    removeSelectedNodes: () => {
      const { selectedNodes, nodes, boardSize } = get();

      // TODO: Only allow if correct result
      if (selectedNodes.length <= 1) {
        return set({ selectedNodes: [], selectedValue: 0 });
      }

      const newNodes: (Node | null)[] = nodes.map((n) =>
        n && !selectedNodes.includes(n) ? n : null
      );

      for (let row = boardSize - 2; row >= 0; row--) {
        for (let column = 0; column < boardSize; column++) {
          const node = newNodes.find(
            (n) => n && n.column === column && n.row === row
          );
          if (!node) continue;

          let lowestPossibleRow = row;
          while (
            lowestPossibleRow + 1 < boardSize &&
            !newNodes.some(
              (n) => n && n.column === column && n.row === lowestPossibleRow + 1
            )
          ) {
            lowestPossibleRow++;
          }

          node.row = lowestPossibleRow;
        }
      }

      set({ selectedNodes: [], selectedValue: 0, nodes: newNodes });
    },
    setInvalidNode: (id) => set({ invalidNodeID: id }),
    resetInvalidNode: () => set({ invalidNodeID: null }),
  },
}));

export const useLevelStore = createSelectors(levelStore);
