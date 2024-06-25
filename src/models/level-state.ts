import { v4 as uuid } from "uuid";

import type { Board, Level, Operation } from "~src/levels";

export type Node = {
  id: string;
  row: number;
  column: number;
  value: number;
};

export type Edge = {
  id: string;
  row: number;
  column: number;
  orientation: "horizontal" | "vertical";
  operation: Operation;
};

export type LevelState = {
  level: Level;
  nodes: Node[];
  edges: Edge[];
  selectedNodes: Node[];
  selectedEdges: Edge[];
  selectedValue: number | null;
  invalidNode: Node | null;
};

export const transformNodes = (board: Board): Node[] => {
  const { boardSize } = board.difficulty.options;
  return board.nodes.map((n, i) => ({
    id: uuid(),
    row: Math.trunc(i / boardSize),
    column: i % boardSize,
    value: n,
  }));
};

export const transformEdges = (board: Board): Edge[] => {
  return board.edges.map((e, i) => {
    const isHorizontal = i < board.edges.length / 2;
    const boardSize =
      board.difficulty.options.boardSize - (isHorizontal ? 1 : 0);
    const index = isHorizontal ? i : i - board.edges.length / 2;

    return {
      id: uuid(),
      row: Math.trunc(index / boardSize),
      column: index % boardSize,
      orientation: isHorizontal ? "horizontal" : "vertical",
      operation: e,
    };
  });
};
