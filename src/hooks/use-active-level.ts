import { useCallback } from "react";

import { type Node } from "~src/models";
import { useLevelStore } from "~src/stores";

const areNodesAdjacent = (n1: Node, n2: Node) => {
  const distance = (n1.row - n2.row) ** 2 + (n1.column - n2.column) ** 2;
  return distance === 1;
};

export const useActiveLevel = () => {
  const activeLevelState = useLevelStore.use.activeLevelState();
  const { setActiveLevelState } = useLevelStore.use.actions();
  if (activeLevelState === null)
    throw new Error("useActiveLevel may only be used on the `Level` screen.");
  const { nodes, level, edges, selectedNodes, invalidNode } = activeLevelState;
  const { boardSize, maxPathLength } = level.board.difficulty.options;

  const applySelectedNodes = useCallback(() => {
    setActiveLevelState(({ selectedNodes }) => {
      console.log(selectedNodes.length);

      return { selectedNodes: [] };
    });
  }, [setActiveLevelState]);

  const resetInvalidNode = () =>
    setActiveLevelState(() => ({ invalidNode: null }));

  const selectNode = (node: Node, type: "initial" | "sequential") => {
    setActiveLevelState(({ selectedNodes }) => {
      const isSelectable = canNodeBeSelected(selectedNodes, node, type);
      if (isSelectable === "ignore") return {};
      if (isSelectable === "not-selectable") return { invalidNode: node };

      return {
        selectedNodes: [...selectedNodes, node],
      };
    });
  };

  const getNodeState = (node: Node): "idle" | "selected" | "invalid" => {
    if (invalidNode?.id === node.id) return "invalid";
    if (selectedNodes.includes(node)) return "selected";
    return "idle";
  };
  const canNodeBeSelected = (
    selectedNodes: Node[],
    node: Node,
    type: "initial" | "sequential"
  ): "ignore" | "not-selectable" | "selectable" => {
    const lastNode = selectedNodes[selectedNodes.length - 1];

    // Disallow node to be selected multiple times
    if (type === "sequential" && selectedNodes.includes(node)) return "ignore";

    // Disallow selection on simple hover
    if (type === "sequential" && !lastNode) return "ignore";

    // Disallow selection if max path length is reached
    if (selectedNodes.length === maxPathLength) return "not-selectable";

    // Disallow only single initial selection on mobile
    if (type === "initial" && lastNode) return "not-selectable";

    // Disallow non-adjacent selection
    if (type === "sequential" && !areNodesAdjacent(node, lastNode))
      return "not-selectable";

    return "selectable";
  };

  return {
    nodes,
    edges,
    boardSize,
    selectNode,
    getNodeState,
    applySelectedNodes,
    resetInvalidNode,
  };
};
