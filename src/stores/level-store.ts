import { create } from "zustand";

import { levelHelpers } from "~src/level-state";
import {
  DEFAULT_SELECTION,
  type GameBoard,
  type Hint,
  type LevelState,
  type Node,
  type Selection,
} from "~src/models";

import { createSelectors } from "./store-utils";

type LevelStore = {
  activeLevelState: LevelState | null;
  selection: Selection;
  forceDisableAnimationKey: number;
  actions: {
    setActiveLevelState: (level: LevelState) => void;
    restartLevel: () => void;
    undoSelection: () => void;
    createHint: () => void;
    setInvalidNode: (node: Node | null) => void;
    updateGameBoard: (board: GameBoard) => void;
    setSelection: (selection: Selection) => void;
    resetSelection: () => void;
  };
};

export const levelStore = create<LevelStore>((set, get) => {
  const getPreviousLevelState = () => {
    const prev = get();

    // This can only happen if level store is used inappropriately outside of the level screen.
    if (!prev.activeLevelState) throw new Error("activeLevelState is not set.");
    return prev.activeLevelState;
  };

  return {
    activeLevelState: null,
    forceDisableAnimationKey: 0,
    selection: DEFAULT_SELECTION,
    actions: {
      setActiveLevelState: (activeLevelState) => {
        set({
          activeLevelState,
        });
      },
      restartLevel: () => {
        const { actions, forceDisableAnimationKey } = get();
        const prev = getPreviousLevelState();

        actions.resetSelection();

        const { nodes, edges } = prev.history[0];

        set({
          forceDisableAnimationKey: forceDisableAnimationKey + 1,
          activeLevelState: {
            ...prev,
            activeObjectiveIndex: 0,
            nodes,
            edges,
            history: [],
          },
        });
      },
      createHint: () => {
        const prev = getPreviousLevelState();
        const objective = prev.objectives[prev.activeObjectiveIndex];

        // TODO: Move this out of here
        const pathLength = objective.path.length;
        const edgeCount = pathLength - 1;
        const edgeIndex =
          ((objective.value % edgeCount) + edgeCount) % edgeCount;

        const n1 = objective.path[edgeIndex];
        const n2 = objective.path[edgeIndex + 1];

        const highlightedEdge = levelHelpers.getEdgeBetweenCoords({
          edges: prev.edges,
          c1: n1,
          c2: n2,
        });

        const hint: Hint = {
          objectiveID: objective.id,
          pathLength,
          highlightedEdgeID: highlightedEdge.id,
        };

        console.log(hint);

        set({ activeLevelState: { ...prev, hint } });
      },
      setInvalidNode: (node) => {
        const { selection } = get();

        set({
          selection: { ...selection, invalidNode: node },
        });
      },
      updateGameBoard: ({ nodes, edges }) => {
        const prev = getPreviousLevelState();
        const history = [
          ...prev.history,
          structuredClone({ nodes: prev.nodes, edges: prev.edges }),
        ];

        const activeObjectiveIndex = prev.activeObjectiveIndex + 1;

        set({
          activeLevelState: {
            ...prev,
            activeObjectiveIndex,
            nodes,
            edges,
            history,
          },
        });
      },

      setSelection: (selection) => set({ selection }),
      resetSelection: () =>
        set({
          selection: DEFAULT_SELECTION,
        }),
      undoSelection: () => {
        const { actions, forceDisableAnimationKey } = get();
        const prev = getPreviousLevelState();

        actions.resetSelection();
        const activeObjectiveIndex = prev.activeObjectiveIndex - 1;

        const { nodes, edges } = prev.history[activeObjectiveIndex];
        const history = prev.history.slice(0, -1);

        set({
          forceDisableAnimationKey: forceDisableAnimationKey + 1,
          activeLevelState: {
            ...prev,
            activeObjectiveIndex,
            nodes,
            edges,
            history,
          },
        });
      },
    },
  };
});

export const useLevelStore = createSelectors(levelStore);
