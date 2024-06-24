import { v4 as uuid } from "uuid";

import type { Board, Level } from "~src/levels";

type Node = {
  id: string;
  row: number;
  column: number;
  value: number;
};

export type LevelState = {
  level: Level;
  nodes: Node[];
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
