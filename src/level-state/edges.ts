import type { Edge, Node } from "~src/models";

type GetEdgeBetweenNodes = {
  edges: Edge[];
  n1: Node;
  n2: Node;
};

export const getEdgeBetweenNodes = ({
  edges,
  n1,
  n2,
}: GetEdgeBetweenNodes): Edge => {
  const orientation = n1.row === n2.row ? "horizontal" : "vertical";
  const { row, column } =
    orientation === "horizontal"
      ? { row: n1.row, column: Math.min(n1.column, n2.column) }
      : { row: Math.min(n1.row, n2.row), column: n1.column };

  const edge = edges.find(
    (e) => e.row === row && e.column === column && e.orientation === orientation
  );

  if (!edge) throw new Error("Unable to find edge.");
  return edge;
};

type EdgeState = "idle" | "selected";

type GetEdgeState = {
  edge: Edge;
  selectedEdges: Edge[];
};

export const getEdgeState = ({
  edge,
  selectedEdges,
}: GetEdgeState): EdgeState => {
  if (selectedEdges.includes(edge)) return "selected";
  return "idle";
};

type RemoveTrailingEdges = {
  nodes: Node[];
  edges: Edge[];
  boardSize: number;
};

export const removeTrailingEdges = ({
  nodes,
  edges,
  boardSize,
}: RemoveTrailingEdges): Edge[] => {
  const emptyNodeIndices = new Set(
    Array.from({ length: nodes.length }, (_, i) => i)
  );
  nodes.forEach(
    (n) => n.active && emptyNodeIndices.delete(n.row * boardSize + n.column)
  );

  const unconnectedEdges = new Set<number>();
  for (const index of emptyNodeIndices) {
    const row = Math.trunc(index / boardSize);
    const column = index % boardSize;

    const edgeCount = 2 * boardSize * boardSize - 2 * boardSize;
    const top = row !== 0 ? index + edgeCount / 2 - boardSize : null;
    const bottom = row !== boardSize - 1 ? index + edgeCount / 2 : null;
    const left = column !== 0 ? index - (row + 1) : null;
    const right = column !== boardSize - 1 ? index - row : null;

    [top, bottom, left, right].forEach(
      (edge) => edge !== null && unconnectedEdges.add(edge)
    );
  }

  return edges.map((e, i) =>
    unconnectedEdges.has(i) ? { ...e, active: false } : e
  );
};
