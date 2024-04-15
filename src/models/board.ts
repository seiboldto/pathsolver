import { type Operation } from "~src/levels";

export type Node = {
  value: number;
  row: number;
  column: number;
  id: string;
};

export type Path = {
  id: string;
  indices: number[];
  result: number;
};

export type Edge = {
  id: string;
  operation: Operation;
};
