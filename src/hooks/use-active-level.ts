import { useCallback } from "react";

import { type Edge, type LevelState, type Node } from "~src/models";
import { useLevelStore } from "~src/stores";

const areNodesAdjacent = (n1: Node, n2: Node) => {
  const distance = (n1.row - n2.row) ** 2 + (n1.column - n2.column) ** 2;
  return distance === 1;
};

const getEdgeBetweenNodes = (edges: Edge[], n1: Node, n2: Node): Edge => {
  const orientation = n1.row === n2.row ? "horizontal" : "vertical";
  const { row, column } =
    orientation === "horizontal"
      ? { row: n1.row, column: Math.min(n1.column, n2.column) }
      : { row: Math.min(n1.row, n2.row), column: n1.column };

  const edge = edges.find(
    (e) => e.row === row && e.column === column && e.orientation === orientation
  );
  return edge!;
};

const removeSelectedNodes = (state: LevelState): Node[] => {
  const { nodes, selectedNodes } = state;
  if (selectedNodes.length <= 1) return nodes;

  const key = (n: Pick<Node, "row" | "column">): `${number}-${number}` =>
    `${n.row}-${n.column}`;

  const newNodes = new Map(nodes.map((n) => [key(n), n]));
  selectedNodes.forEach((n) => newNodes.delete(key(n)));

  const { boardSize } = state.level.board.difficulty.options;
  for (let column = 0; column < boardSize; column++) {
    for (let row = boardSize - 2; row >= 0; row--) {
      const node = newNodes.get(key({ row, column }));
      if (!node) continue;

      let lowestPossibleRow = row;
      while (!newNodes.has(key({ row: lowestPossibleRow + 1, column }))) {
        if (lowestPossibleRow + 1 === boardSize) break;
        lowestPossibleRow++;
      }

      node.row = lowestPossibleRow;
      newNodes.delete(key({ row, column }));
      newNodes.set(key(node), node);
    }
  }

  return Array.from(newNodes.values());
};

export const useActiveLevel = () => {
  const activeLevelState = useLevelStore.use.activeLevelState();
  const { setActiveLevelState } = useLevelStore.use.actions();
  if (activeLevelState === null)
    throw new Error("useActiveLevel may only be used on the `Level` screen.");

  const { nodes, level, edges, selectedNodes, selectedEdges, invalidNode } =
    activeLevelState;
  const { boardSize, maxPathLength } = level.board.difficulty.options;

  const applySelectedNodes = useCallback(() => {
    setActiveLevelState((prev) => {
      const nodes = removeSelectedNodes(prev);
      return {
        selectedNodes: [],
        selectedValue: null,
        selectedEdges: [],
        nodes,
      };
    });
  }, [setActiveLevelState]);

  const resetInvalidNode = () =>
    setActiveLevelState(() => ({ invalidNode: null }));

  const selectNode = (node: Node, type: "initial" | "sequential") => {
    setActiveLevelState(
      ({ selectedNodes, edges, selectedValue, selectedEdges }) => {
        const isSelectable = canNodeBeSelected(selectedNodes, node, type);
        if (isSelectable === "ignore") return {};
        if (isSelectable === "not-selectable") return { invalidNode: node };

        let newSelectedValue = node.value;
        let newSelectedEdges = selectedEdges;
        if (selectedValue !== null) {
          const edge = getEdgeBetweenNodes(
            edges,
            node,
            selectedNodes[selectedNodes.length - 1]
          );
          newSelectedValue = edge.operation.apply(selectedValue, node.value);
          newSelectedEdges = [...selectedEdges, edge];
        }

        return {
          selectedNodes: [...selectedNodes, node],
          selectedEdges: newSelectedEdges,
          selectedValue: newSelectedValue,
        };
      }
    );
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

  const getEdgeState = (edge: Edge): "idle" | "selected" => {
    if (selectedEdges.includes(edge)) return "selected";
    return "idle";
  };

  return {
    nodes,
    edges,
    boardSize,
    selectNode,
    getEdgeState,
    getNodeState,
    applySelectedNodes,
    resetInvalidNode,
  };
};
