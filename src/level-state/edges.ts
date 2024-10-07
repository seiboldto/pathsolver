import type { Coords, Edge, Hint, Node } from "~src/models";

type GetEdgeBetweenCoords = {
  edges: Edge[];
  c1: Coords;
  c2: Coords;
};

export const getEdgeBetweenCoords = ({
  edges,
  c1,
  c2,
}: GetEdgeBetweenCoords): Edge => {
  const orientation = c1.row === c2.row ? "horizontal" : "vertical";
  const { row, column } =
    orientation === "horizontal"
      ? { row: c1.row, column: Math.min(c1.column, c2.column) }
      : { row: Math.min(c1.row, c2.row), column: c1.column };

  const edge = edges.find(
    (e) => e.row === row && e.column === column && e.orientation === orientation
  );

  if (!edge) throw new Error("Unable to find edge.");
  return edge;
};

type EdgeState = "idle" | "selected" | "highlighted";

type GetEdgeState = {
  edge: Edge;
  selectedEdges: Edge[];
  activeObjectiveIndex: number;
  hint: Hint | null;
};

export const getEdgeState = ({
  edge,
  selectedEdges,
  activeObjectiveIndex,
  hint,
}: GetEdgeState): EdgeState => {
  if (selectedEdges.includes(edge)) return "selected";

  if (
    hint &&
    hint.highlightedEdgeID === edge.id &&
    activeObjectiveIndex <= hint.objectiveIndex
  )
    return "highlighted";

  return "idle";
};

type GetEdgeNodeCoords = {
  edge: Edge;
};

type EdgeNodeCoords = [Coords, Coords];

export const getEdgeNodeCoords = ({
  edge,
}: GetEdgeNodeCoords): EdgeNodeCoords => {
  const { row, column } = edge;
  if (edge.orientation === "horizontal") {
    return [
      { row, column },
      { row, column: column + 1 },
    ];
  }

  return [
    { row, column },
    { row: row + 1, column },
  ];
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
