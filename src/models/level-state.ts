import { v4 as uuid } from "uuid";

import type {
  Board,
  DifficultyOptions,
  Level,
  OperationKind,
  Path,
} from "~src/level-gen";

export type Coords = {
  row: number;
  column: number;
};

export type Node = {
  id: string;
  active: boolean;
  row: number;
  column: number;
  value: number;
};

export type GameBoard = {
  nodes: Node[];
  edges: Edge[];
};

export type Edge = {
  id: string;
  active: boolean;
  row: number;
  column: number;
  orientation: "horizontal" | "vertical";
  operation: OperationKind;
};

export type Objective = {
  id: string;
  index: number;
  path: Coords[];
  value: number;
};

export type Selection = {
  nodes: Node[];
  edges: Edge[];
  value: number | null;
  invalidNode: Node | null;
};

export const DEFAULT_SELECTION: Selection = {
  nodes: [],
  edges: [],
  value: null,
  invalidNode: null,
};

export type LevelState = {
  seed: number;
  difficultyOptions: DifficultyOptions;
  nodes: Node[];
  edges: Edge[];
  objectives: Objective[];
  activeObjectiveIndex: number;
  history: GameBoard[];
};

export const transformLevel = (level: Level): LevelState => {
  return {
    seed: level.seed,
    difficultyOptions: level.board.difficulty.options,
    nodes: transformNodes(level.board),
    edges: transformEdges(level.board),
    objectives: transformObjectives(level.paths, level.board),
    activeObjectiveIndex: 0,

    history: [],
  };
};

const transformNodes = (board: Board): Node[] => {
  const { boardSize } = board.difficulty.options;
  return board.nodes.map((n, i) => ({
    id: uuid(),
    active: true,
    row: Math.trunc(i / boardSize),
    column: i % boardSize,
    value: n,
  }));
};

const transformEdges = (board: Board): Edge[] => {
  return board.edges.map((e, i) => {
    const isHorizontal = i < board.edges.length / 2;
    const boardSize =
      board.difficulty.options.boardSize - (isHorizontal ? 1 : 0);
    const index = isHorizontal ? i : i - board.edges.length / 2;

    const { row, column } = transformIndex(index, boardSize);

    return {
      id: uuid(),
      active: true,
      row,
      column,
      orientation: isHorizontal ? "horizontal" : "vertical",
      operation: e.kind,
    };
  });
};

const transformObjectives = (paths: Path[], board: Board): Objective[] => {
  const { boardSize } = board.difficulty.options;

  return paths.map((p, i) => ({
    id: uuid(),
    index: i,
    path: p.indices.map((i) => transformIndex(i, boardSize)),
    value: p.result,
  }));
};

const transformIndex = (index: number, boardSize: number): Coords => ({
  row: Math.trunc(index / boardSize),
  column: index % boardSize,
});
