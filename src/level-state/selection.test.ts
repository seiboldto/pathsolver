import { describe, expect, it } from "vitest";

import { e, n } from "~src/__tests__";

import {
  applySelectedNode,
  applySelectedNodes,
  canSelectionBeApplied,
  getSelectionState,
} from "./selection";

const nodes = [
  { ...n(0, 0), value: 1 },
  { ...n(0, 1), value: 2 },
  n(1, 0),
  n(1, 1),
];
const edges = [e(0, 0, "h"), e(1, 0, "h"), e(0, 0, "v"), e(0, 1, "v")];

const selection = {
  nodes: [nodes[0], nodes[1]],
  edges: [e(0, 0, "h")],
  value: 5,
};

const objectives = [
  {
    id: "",
    index: 0,
    path: [
      { row: 0, column: 0 },
      { row: 0, column: 1 },
    ],
    value: 5,
  },
];
const activeObjectiveIndex = 0;

describe("get selection state", () => {
  it("calculates selection state", () => {
    expect(getSelectionState({ selection, invalidNode: n(1, 1) })).toEqual({
      key: expect.stringContaining(""),
      isInvalid: true,
      length: 2,
      value: 5,
    });
  });

  it("sets selection value to 0 if it is null", () => {
    expect(
      getSelectionState({
        selection: { nodes: [], edges: [], value: null },
        invalidNode: null,
      })
    ).toEqual(expect.objectContaining({ value: 0 }));
  });
});

describe("can selection be applied", () => {
  it("returns false on selections smaller than 2 nodes", () => {
    expect(
      canSelectionBeApplied({
        activeObjectiveIndex,
        objectives,
        selection: { ...selection, nodes: [n(0, 0)] },
      })
    ).toEqual(false);
  });

  it("returns false if the selection doesn't match the objective", () => {
    expect(
      canSelectionBeApplied({
        activeObjectiveIndex,
        objectives,
        selection: { ...selection, value: 3 },
      })
    ).toEqual(false);
  });

  it("returns true if the selection can be applied", () => {
    expect(
      canSelectionBeApplied({
        activeObjectiveIndex,
        objectives,
        selection,
      })
    ).toEqual(true);
  });
});

describe("apply selected node", () => {
  it("works if the selected node was the first one", () => {
    expect(
      applySelectedNode({
        node: nodes[0],
        edges,
        selection: { edges: [], nodes: [], value: null },
      })
    ).toEqual({ edges: [], nodes: [nodes[0]], value: 1 });
  });

  it("works for following nodes", () => {
    expect(
      applySelectedNode({
        node: nodes[1],
        edges,
        selection: { edges: [], nodes: [nodes[0]], value: 1 },
      })
    ).toEqual({ edges: [edges[0]], nodes: [nodes[0], nodes[1]], value: 3 });
  });
});

describe("apply selected nodes", () => {
  it("is not applicable in certain cases", () => {
    expect(
      applySelectedNodes({
        activeObjectiveIndex,
        objectives,
        selection: { edges: [], nodes: [nodes[0]], value: 1 },
        boardSize: 2,
        nodes,
        edges,
      })
    ).toEqual("not-applicable");
  });

  it("returns the new game board state", () => {
    expect(
      applySelectedNodes({
        activeObjectiveIndex,
        objectives,
        selection,
        boardSize: 2,
        nodes,
        edges,
      })
    ).toEqual({
      nodes: [
        { ...n(0, 0, false), value: 1 },
        { ...n(0, 1, false), value: 2 },
        n(1, 0, true),
        n(1, 1, true),
      ],
      edges: [
        e(0, 0, "h", false),
        e(1, 0, "h"),
        e(0, 0, "v", false),
        e(0, 1, "v", false),
      ],
    });
  });
});
