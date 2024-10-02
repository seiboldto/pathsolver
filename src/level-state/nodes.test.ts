import { describe, expect, it } from "vitest";

import { n } from "~src/__tests__";

import {
  areNodesAdjacent,
  canNodeBeSelected,
  getNodeState,
  removeSelectedNodes,
} from "./nodes";

it("determines wheter nodes are adjacent", () => {
  expect(areNodesAdjacent(n(0, 0), n(0, 1))).toEqual(true);
  expect(areNodesAdjacent(n(0, 0), n(1, 0))).toEqual(true);
  expect(areNodesAdjacent(n(0, 0), n(1, 1))).toEqual(false);
});

describe("can node be selected", () => {
  it("is ignored if the node is already selected", () => {
    const node = n(0, 0);

    expect(
      canNodeBeSelected({
        node,
        selectedNodes: [node],
        type: "click",
      })
    ).toEqual("ignore");
  });

  it("is ignored if the node was only hovered", () => {
    expect(
      canNodeBeSelected({
        node: n(0, 0),
        selectedNodes: [],
        type: "hover",
      })
    ).toEqual("ignore");
  });

  it("is not selectable if there is already a selection elsewhere", () => {
    expect(
      canNodeBeSelected({
        node: n(1, 1),
        selectedNodes: [n(0, 0)],
        type: "click",
      })
    ).toEqual("not-selectable");
  });

  it("is not selectable if node is not adjacent to last node", () => {
    expect(
      canNodeBeSelected({
        node: n(1, 1),
        selectedNodes: [n(0, 0)],
        type: "hover",
      })
    ).toEqual("not-selectable");
  });

  it("is selectable as the initial node", () => {
    expect(
      canNodeBeSelected({
        node: n(1, 1),
        selectedNodes: [],
        type: "click",
      })
    ).toEqual("selectable");
  });

  it("is selectable as the next node in a path", () => {
    expect(
      canNodeBeSelected({
        node: n(0, 1),
        selectedNodes: [n(0, 0)],
        type: "hover",
      })
    ).toEqual("selectable");
  });
});

describe("get node state", () => {
  it("is is invalid if node is invalid", () => {
    const node = n(0, 0);
    expect(
      getNodeState({ node, invalidNode: node, selectedNodes: [] })
    ).toEqual("invalid");
  });

  it("is is selected if node is in selected nodes", () => {
    const node = n(0, 0);
    expect(
      getNodeState({ node, invalidNode: null, selectedNodes: [node] })
    ).toEqual("selected");
  });

  it("is idle otherwise", () => {
    expect(
      getNodeState({
        node: n(0, 0),
        invalidNode: n(0, 1),
        selectedNodes: [n(0, 2)],
      })
    ).toEqual("idle");
  });
});

describe("remove selected nodes", () => {
  const boardSize = 2;

  it("applies gravity to remaining nodes", () => {
    const nodes = [n(0, 0), n(0, 1), n(1, 0), n(1, 1)];
    const selectedNodes = nodes.slice(2);

    const newNodes = removeSelectedNodes({ nodes, selectedNodes, boardSize });
    expect(newNodes).toEqual([
      n(1, 0),
      n(1, 1),
      n(1, 0, false),
      n(1, 1, false),
    ]);
  });

  it("ignores already removed nodes", () => {
    const nodes = [n(0, 0), n(0, 1, false), n(1, 0), n(1, 1)];
    const selectedNodes = nodes.slice(2);

    const newNodes = removeSelectedNodes({ nodes, selectedNodes, boardSize });
    expect(newNodes).toEqual([
      n(1, 0),
      n(0, 1, false),
      n(1, 0, false),
      n(1, 1, false),
    ]);
  });
});
