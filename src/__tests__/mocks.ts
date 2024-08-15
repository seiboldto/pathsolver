import type { Edge, Node } from "~src/models";

export const n = (row: number, column: number, active = true): Node => {
  return { row, column, active, id: "", value: 0 };
};

export const e = (
  row: number,
  column: number,
  orientation: "v" | "h",
  active = true
): Edge => {
  return {
    row,
    column,
    operation: "addition",
    orientation: orientation === "v" ? "vertical" : "horizontal",
    active,
    id: "",
  };
};
