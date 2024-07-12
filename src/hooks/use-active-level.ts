import { useCallback } from "react";
import { v4 as uuid } from "uuid";

import {
  type Edge,
  type LevelState,
  type Node,
  type Objective,
} from "~src/models";
import { useLevelStore } from "~src/stores";

const areNodesAdjacent = (n1: Node, n2: Node) => {
  const distance = (n1.row - n2.row) ** 2 + (n1.column - n2.column) ** 2;
  return distance === 1;
};

const getEdgeBetweenNodes = (
  edges: (Edge | null)[],
  n1: Node,
  n2: Node
): Edge => {
  const orientation = n1.row === n2.row ? "horizontal" : "vertical";
  const { row, column } =
    orientation === "horizontal"
      ? { row: n1.row, column: Math.min(n1.column, n2.column) }
      : { row: Math.min(n1.row, n2.row), column: n1.column };

  const edge = edges.find(
    (e) =>
      e && e.row === row && e.column === column && e.orientation === orientation
  );
  return edge!;
};

const removeSelectedNodes = (state: LevelState): (Node | null)[] => {
  const { nodes, selectedNodes } = state;

  const newNodes = nodes.map((n) =>
    n && selectedNodes.includes(n) ? null : n
  );

  const findNode = ({ row, column }: Pick<Node, "row" | "column">) =>
    newNodes.find((n) => n && n.row === row && n.column === column);

  const { boardSize } = state.level.board.difficulty.options;
  for (let column = 0; column < boardSize; column++) {
    for (let row = boardSize - 2; row >= 0; row--) {
      const node = findNode({ row, column });
      if (!node) continue;

      let lowestPossibleRow = row;
      while (!findNode({ row: lowestPossibleRow + 1, column })) {
        if (lowestPossibleRow + 1 === boardSize) break;

        lowestPossibleRow++;
      }
      node.row = lowestPossibleRow;
    }
  }

  return newNodes;
};

const removeTrailingEdges = (
  nodes: (Node | null)[],
  state: LevelState
): (Edge | null)[] => {
  const { boardSize } = state.level.board.difficulty.options;

  const emptyNodeIndices = new Set(
    Array.from({ length: nodes.length }, (_, i) => i)
  );
  nodes.forEach(
    (n) => n && emptyNodeIndices.delete(n.row * boardSize + n.column)
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

  return state.edges.map((e, i) => (unconnectedEdges.has(i) ? null : e));
};

export const useActiveLevel = () => {
  const activeLevelState = useLevelStore.use.activeLevelState();
  const { setActiveLevelState, setActiveLevel } = useLevelStore.use.actions();
  if (activeLevelState === null)
    throw new Error("useActiveLevel may only be used on the `Level` screen.");

  const {
    nodes,
    level,
    edges,
    selectedNodes,
    selectedEdges,
    invalidNode,
    selectedValue,
    objectives,
    activeObjectiveIndex,
  } = activeLevelState;
  const { boardSize, maxPathLength } = level.board.difficulty.options;

  const applySelectedNodes = useCallback(() => {
    setActiveLevelState((prev) => {
      const { value } = prev.objectives[prev.activeObjectiveIndex];
      const { selectedValue } = prev;

      if (prev.selectedNodes.length <= 1 || value !== selectedValue)
        return { selectedNodes: [], selectedValue: null, selectedEdges: [] };

      const nodes = removeSelectedNodes(prev);
      const edges = removeTrailingEdges(nodes, prev);
      return {
        selectedNodes: [],
        selectedValue: null,
        selectedEdges: [],
        nodes,
        edges,
        activeObjectiveIndex: prev.activeObjectiveIndex + 1,
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

  const getGameState = (): "waiting" | "playing" | "won" => {
    if (activeObjectiveIndex === 0) return "waiting";
    if (activeObjectiveIndex === objectives.length) return "won";
    return "playing";
  };

  const restartLevel = () => {
    setActiveLevel(level);
  };

  const getObjectiveState = (
    objective: Objective
  ): "active" | "completed" | "pending" => {
    if (objective.index === activeObjectiveIndex) return "active";
    if (objective.index < activeObjectiveIndex) return "completed";
    return "pending";
  };

  const selection = {
    value: selectedValue,
    key: uuid(),
    count: selectedNodes.length,
    isInvalid: invalidNode !== null,
  };

  return {
    nodes,
    edges,
    boardSize,
    selection,
    objectives,
    getObjectiveState,
    selectNode,
    getEdgeState,
    getNodeState,
    applySelectedNodes,
    resetInvalidNode,
    restartLevel,
    getGameState,
  };
};
