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
  const { nodes, level, edges, selectedNodes } = activeLevelState;
  const { boardSize, maxPathLength } = level.board.difficulty.options;

  const applySelectedNodes = useCallback(() => {
    setActiveLevelState(({ selectedNodes }) => {
      console.log(selectedNodes.length);

      return { selectedNodes: [] };
    });
  }, [setActiveLevelState]);

  const selectNode = (node: Node, type: "initial" | "sequential") => {
    setActiveLevelState(({ selectedNodes }) => {
      if (!canNodeBeSelected(selectedNodes, node, type)) return {};

      return {
        selectedNodes: [...selectedNodes, node],
      };
    });
  };

  const isNodeSelected = (node: Node) => selectedNodes.includes(node);
  const canNodeBeSelected = (
    selectedNodes: Node[],
    node: Node,
    type: "initial" | "sequential"
  ): boolean => {
    const lastNode = selectedNodes[selectedNodes.length - 1];

    // Disallow selection if max path length is reached
    if (selectedNodes.length === maxPathLength) return false;

    // Disallow only single initial selection on mobile
    if (type === "initial" && lastNode) return false;

    // Disallow selection on simple hover
    if (type === "sequential" && !lastNode) return false;

    // Disallow non-adjacent selection
    if (type === "sequential" && !areNodesAdjacent(node, lastNode))
      return false;

    // Disallow node to be selected multiple times
    if (type === "sequential" && selectedNodes.includes(node)) return false;

    return true;
  };

  return {
    nodes,
    edges,
    boardSize,
    selectNode,
    isNodeSelected,
    applySelectedNodes,
  };
};
