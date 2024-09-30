import { v4 as uuid } from "uuid";

import { Operation } from "~src/level-gen";
import type { Edge, GameBoard, Node, Objective, Selection } from "~src/models";

import { getEdgeBetweenCoords, removeTrailingEdges } from "./edges";
import { removeSelectedNodes } from "./nodes";

type GetSelectionState = {
  selection: Selection;
};

type SelectionState = {
  value: number | null;
  key: string;
  length: number;
  isInvalid: boolean;
};

export const getSelectionState = ({
  selection,
}: GetSelectionState): SelectionState => {
  return {
    value: selection.value,
    key: uuid(),
    length: selection.nodes.length,
    isInvalid: selection.invalidNode !== null,
  };
};
type CanSelectionBeApplied = {
  selection: Selection;
  objectives: Objective[];
  activeObjectiveIndex: number;
};

export const canSelectionBeApplied = ({
  selection,
  objectives,
  activeObjectiveIndex,
}: CanSelectionBeApplied): boolean => {
  if (selection.nodes.length <= 1) return false;

  const objective = objectives[activeObjectiveIndex].value;
  if (objective !== selection.value) return false;
  return true;
};

type ApplySelectedNode = {
  node: Node;
  edges: Edge[];
  selection: Selection;
};

export const applySelectedNode = ({
  node,
  edges,
  selection,
}: ApplySelectedNode): Selection => {
  let newSelectedValue = node.value;
  let newSelectedEdges = selection.edges;
  if (selection.value !== null) {
    const edge = getEdgeBetweenCoords({
      edges,
      c1: node,
      c2: selection.nodes[selection.nodes.length - 1],
    });

    const operation = new Operation(edge.operation);
    newSelectedValue = operation.apply(selection.value, node.value);
    newSelectedEdges = [...selection.edges, edge];
  }

  return {
    nodes: [...selection.nodes, node],
    edges: newSelectedEdges,
    value: newSelectedValue,
    invalidNode: selection.invalidNode,
  };
};

type ApplySelectedNodes = {
  nodes: Node[];
  edges: Edge[];
  selection: Selection;
  objectives: Objective[];
  activeObjectiveIndex: number;
  boardSize: number;
};

export const applySelectedNodes = ({
  nodes,
  edges,
  selection,
  objectives,
  activeObjectiveIndex,
  boardSize,
}: ApplySelectedNodes): GameBoard | "not-applicable" | "ignore" => {
  if (selection.nodes.length === 0) return "ignore";

  const isSelectionApplicable = canSelectionBeApplied({
    selection,
    objectives,
    activeObjectiveIndex,
  });
  if (!isSelectionApplicable) return "not-applicable";

  const newNodes = removeSelectedNodes({
    nodes,
    selectedNodes: selection.nodes,
    boardSize,
  });

  const newEdges = removeTrailingEdges({
    nodes: newNodes,
    edges,
    boardSize,
  });

  return { nodes: newNodes, edges: newEdges };
};
