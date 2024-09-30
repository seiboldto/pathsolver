import { useCallback } from "react";

import {
  createLevelFunc,
  levelAppliers,
  levelHelpers,
  levelState,
} from "~src/level-state";
import { type GameBoard } from "~src/models";
import { levelStore, useLevelStore, useStatisticsStore } from "~src/stores";

import { useLevel } from "./use-level";

export const useActiveLevel = () => {
  const activeLevelState = useLevelStore.use.activeLevelState();
  if (activeLevelState === null)
    throw new Error("useActiveLevel may only be used on the `Level` screen.");

  const { updateStats } = useStatisticsStore.use.actions();
  const { updatePersistedLevel, deletePersistedLevel } = useLevel();
  const selection = useLevelStore.use.selection();

  const {
    seed,
    nodes,
    difficultyOptions,
    edges,
    activeObjectiveIndex,
    objectives,
    hint,
  } = activeLevelState;
  const { boardSize, maxPathLength, preset } = difficultyOptions;

  // As these function are used in a window event listener, they need to be memoised.
  const applySelectedNodes = useCallback(() => {
    const { activeLevelState, selection } = levelStore.getState();

    const { objectives, activeObjectiveIndex, nodes, edges } =
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

  const handleGameStep = useCallback(
    (board: GameBoard) => {
      const { actions, activeLevelState } = useLevelStore.getState();
      const { updateGameBoard } = actions;
      if (!activeLevelState) return;

      updateGameBoard(board);
      const { activeLevelState: newLevelState } = useLevelStore.getState();
      if (!newLevelState) return;

      const newGameState = levelState.getGameState({
        activeObjectiveIndex: newLevelState.activeObjectiveIndex,
        nodes: newLevelState.nodes,
        objectivesCount: newLevelState.objectives.length,
      });

      if (newGameState.hasWon) {
        if (!newLevelState.hint)
          updateStats(preset, newGameState.state === "perfect-won");
        deletePersistedLevel();
      } else {
        updatePersistedLevel();
      }
    },
    [updateStats, deletePersistedLevel, updatePersistedLevel, preset]
  );

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
    invalidNode: selection.invalidNode,
  });

  const getEdgeState = createLevelFunc(levelState.getEdgeState, {
    selectedEdges: selection.edges,
    activeObjectiveID: objectives[activeObjectiveIndex].id,
    hint,
  });

  const getEdgeNodeCoords = createLevelFunc(levelHelpers.getEdgeNodeCoords, {});

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
  });

  const tutorialState = levelState.getTutorialState({
    activeObjectiveIndex,
    objectives,
    selectionLength: selectionState.length,
    selectionValue: selection.value,
  });

  return {
    seed,
    difficultyOptions,
    nodes,
    edges,
    hint,

    boardSize,
    selectionState,
    objectivesState,
    gameState,
    tutorialState,

    canNodeBeSelected,
    applySelectedNode,
    applySelectedNodes,

    getEdgeNodeCoords,
    getEdgeState,
    getNodeState,

    handleGameStep,
  };
};
