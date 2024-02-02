export type LevelType = null;

export type Level = {
  board: Board;
  path: Path[];
};

export type Board = {
  size: number;
  nodes: number[];
  edges: Operation[];
};

export type Path = {
  indices: number[];
  result: number;
};

export type Operation = "add" | "subtract" | "multiply" | "divide";
