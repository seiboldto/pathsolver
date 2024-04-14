import { v4 as uuid } from "uuid";
import { create } from "zustand";

import { type Board, type Path as GeneratedPath } from "~src/levels";
import { type Edge, type Node, type Path } from "~src/models";

import { createSelectors } from "./store-utils";

type LevelStore = {
  nodes: (Node | null)[];
  edges: (Edge | null)[];
  selectedNodes: Node[];
  selectedValue: number;
  invalidNodeID: string | null;
  boardSize: number;
  paths: Path[];
  currentPathIndex: number;
  actions: {
    setInitialState: (board: Board, paths: GeneratedPath[]) => void;
    selectNode: (node: Node, board: Board) => void;
    removeSelectedNodes: () => void;
    removeUnconnectedEdges: () => void;
    setInvalidNode: (id: string) => void;
    resetInvalidNode: () => void;
    resetSelected: () => void;
  };
};

const levelStore = create<LevelStore>((set, get) => ({
  nodes: [],
  selectedNodes: [],
  selectedValue: 0,
  invalidNodeID: null,
  boardSize: 0,
  paths: [],
  edges: [],
  currentPathIndex: 0,
  actions: {
    setInitialState: (board, paths) =>
      set({
        nodes: board.nodes.map((n, i) => ({
          value: n,
          id: uuid(),
          row: Math.floor(i / board.difficulty.boardSize),
          column: i % board.difficulty.boardSize,
        })),
        edges: board.edges.map((e) => ({ operation: e, id: uuid() })),
        selectedNodes: [],
        selectedValue: 0,
        paths: paths.map((p) => ({
          id: p.indices.join(","),
          indices: p.indices,
          result: p.result,
          state: "completed",
        })),
        currentPathIndex: 0,
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
      const { selectedNodes, nodes, boardSize, currentPathIndex } = get();

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

      set({
        selectedNodes: [],
        selectedValue: 0,
        nodes: newNodes,
        currentPathIndex: currentPathIndex + 1,
      });
    },
    removeUnconnectedEdges: () => {
      const { nodes, edges, boardSize } = get();
      const emptyNodeIndices = Array.from(
        { length: nodes.length },
        (_, i): number | null => i
      );

      for (const node of nodes)
        if (node) emptyNodeIndices[node.row * boardSize + node.column] = null;

      const unconnectedEdgeIndices = new Set<number>();
      for (const nodeIndex of emptyNodeIndices) {
        if (nodeIndex === null) continue;

        const row = Math.trunc(nodeIndex / boardSize);
        const column = nodeIndex % boardSize;

        const edgeCount = 2 * boardSize * boardSize - 2 * boardSize;
        const top = row !== 0 ? nodeIndex + edgeCount / 2 - boardSize : null;
        const bottom = row !== boardSize - 1 ? nodeIndex + edgeCount / 2 : null;
        const left = column !== 0 ? nodeIndex - (row + 1) : null;
        const right = column !== boardSize - 1 ? nodeIndex - row : null;

        [top, bottom, left, right].forEach(
          (edge) => edge !== null && unconnectedEdgeIndices.add(edge)
        );
      }

      const newEdges = [...edges];
      for (const edgeIndex of unconnectedEdgeIndices)
        newEdges[edgeIndex] = null;
      set({ edges: newEdges });
    },
    resetSelected: () => set({ selectedValue: 0, selectedNodes: [] }),
    setInvalidNode: (id) => set({ invalidNodeID: id }),
    resetInvalidNode: () => set({ invalidNodeID: null }),
  },
}));

export const useLevelStore = createSelectors(levelStore);
