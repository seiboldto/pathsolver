import { describe, expect, it } from "vitest";

import { c, e, n } from "~src/__tests__";

import {
  getEdgeBetweenCoords,
  getEdgeNodeCoords,
  getEdgeState,
  removeTrailingEdges,
} from "./edges";

describe("get edge between coords", () => {
  it("returns the correct horizontal edge", () => {
    const edge = e(0, 0, "h");

    expect(
      getEdgeBetweenCoords({ edges: [edge], c1: c(0, 0), c2: c(0, 1) })
    ).toEqual(edge);
  });

  it("returns the correct vertical edge", () => {
    const edge = e(0, 0, "v");

    expect(
      getEdgeBetweenCoords({ edges: [edge], c1: c(0, 0), c2: c(1, 0) })
    ).toEqual(edge);
  });

  it("throws an error if no edge is found", () => {
    expect(() =>
      getEdgeBetweenCoords({ edges: [], c1: c(0, 0), c2: c(0, 1) })
    ).toThrow();
  });
});

describe("get edge state", () => {
  const edge = e(0, 0, "h");

  it("is idle by default", () => {
    expect(
      getEdgeState({
        edge,
        selectedEdges: [],
        activeObjectiveIndex: 0,
        hint: null,
      })
    ).toEqual("idle");
  });

  it("is selected if applicable", () => {
    expect(
      getEdgeState({
        edge,
        selectedEdges: [edge],
        activeObjectiveIndex: 0,
        hint: null,
      })
    ).toEqual("selected");
  });

  it("is not highlighted if the hint does not use the edge", () => {
    expect(
      getEdgeState({
        edge,
        selectedEdges: [],
        activeObjectiveIndex: 0,
        hint: {
          highlightedEdgeID: "different",
          objectiveIndex: 0,
          pathLength: 3,
        },
      })
    ).toEqual("idle");
  });

  it("is not highlighted if the objective doesn't match", () => {
    expect(
      getEdgeState({
        edge,
        selectedEdges: [],
        activeObjectiveIndex: 1,
        hint: {
          highlightedEdgeID: "",
          objectiveIndex: 0,
          pathLength: 3,
        },
      })
    ).toEqual("idle");
  });

  it("is highlighted if the hint uses the edge and the active objective is infront", () => {
    expect(
      getEdgeState({
        edge,
        selectedEdges: [],
        activeObjectiveIndex: 0,
        hint: {
          highlightedEdgeID: "",
          objectiveIndex: 1,
          pathLength: 3,
        },
      })
    ).toEqual("highlighted");
  });

  it("is highlighted if the hint uses the edge and the active objective matches", () => {
    expect(
      getEdgeState({
        edge,
        selectedEdges: [],
        activeObjectiveIndex: 1,
        hint: {
          highlightedEdgeID: "",
          objectiveIndex: 1,
          pathLength: 3,
        },
      })
    ).toEqual("highlighted");
  });
});

describe("remove trailing edges", () => {
  it("removes trailing edges", () => {
    const nodes = [n(0, 0, false), n(0, 1, false), n(1, 0, false), n(1, 1)];
    const edges = [e(0, 0, "h"), e(1, 0, "h"), e(0, 0, "v"), e(0, 1, "v")];

    const newEdges = removeTrailingEdges({ boardSize: 2, nodes, edges });
    expect(newEdges).toEqual(edges.map((e) => ({ ...e, active: false })));
  });

  it("does nothing if no nodes are inactive", () => {
    const nodes = [n(0, 0), n(0, 1), n(1, 0), n(1, 1)];
    const edges = [e(0, 0, "h"), e(1, 0, "h"), e(0, 0, "v"), e(0, 1, "v")];

    const newEdges = removeTrailingEdges({ boardSize: 2, nodes, edges });
    expect(newEdges).toEqual(edges);
  });
});

describe("get edge node coords", () => {
  it("supports horizontal edges", () => {
    const edge = e(0, 0, "h");
    const [n1, n2] = getEdgeNodeCoords({ edge });
    expect(n1).toEqual({ row: 0, column: 0 });
    expect(n2).toEqual({ row: 0, column: 1 });
  });

  it("supports vertical edges", () => {
    const edge = e(0, 0, "v");
    const [n1, n2] = getEdgeNodeCoords({ edge });
    expect(n1).toEqual({ row: 0, column: 0 });
    expect(n2).toEqual({ row: 1, column: 0 });
  });
});
