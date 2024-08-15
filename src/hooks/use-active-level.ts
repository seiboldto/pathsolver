import { useCallback } from "react";

import {
  createLevelFunc,
  levelAppliers,
  levelHelpers,
  levelState,
} from "~src/level-state";
import { levelStore, useLevelStore } from "~src/stores";

export const useActiveLevel = () => {
  const activeLevelState = useLevelStore.use.activeLevelState();
  if (activeLevelState === null)
    throw new Error("useActiveLevel may only be used on the `Level` screen.");

  const {
    nodes,
    level,
    edges,
    invalidNode,
    activeObjectiveIndex,
    selection,
    objectives,
  } = activeLevelState;
  const { boardSize, maxPathLength } = level.board.difficulty.options;

  // As this function is used in a window event listener, it needs to be memoised.
  const applySelectedNodes = useCallback(() => {
    const { activeLevelState } = levelStore.getState();

    const { selection, objectives, activeObjectiveIndex, nodes, edges } =
      activeLevelState!;

    return levelAppliers.applySelectedNodes({
      nodes,
      edges,
      selection,
      objectives,
      activeObjectiveIndex,
      boardSize,
    });
  }, [boardSize]);

  const canNodeBeSelected = createLevelFunc(levelHelpers.canNodeBeSelected, {
    selectedNodes: selection.nodes,
    maxPathLength,
  });

  const applySelectedNode = createLevelFunc(levelAppliers.applySelectedNode, {
    edges,
    selection,
  });

  const getNodeState = createLevelFunc(levelState.getNodeState, {
    selectedNodes: selection.nodes,
    invalidNode,
  });

  const getEdgeState = createLevelFunc(levelState.getEdgeState, {
    selectedEdges: selection.edges,
  });

  const gameState = levelState.getGameState({
    activeObjectiveIndex,
    objectivesCount: objectives.length,
    nodes,
  });

  const objectivesState = levelState.getObjectivesState({
    objectives,
    activeObjectiveIndex,
    objectivesCount: objectives.length,
  });

  const selectionState = levelState.getSelectionState({
    selection,
    invalidNode,
  });

  return {
    level,
    nodes,
    edges,

    boardSize,
    selectionState,
    objectivesState,
    gameState,

    canNodeBeSelected,
    applySelectedNode,
    applySelectedNodes,

    getEdgeState,
    getNodeState,
  };
};
