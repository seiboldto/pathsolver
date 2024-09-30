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

it("calculates edge state", () => {
  const edge = e(0, 0, "h");

  expect(getEdgeState({ edge, selectedEdges: [] })).toEqual("idle");
  expect(getEdgeState({ edge, selectedEdges: [edge] })).toEqual("selected");
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
