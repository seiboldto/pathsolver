import { create } from "zustand";

import {
  DEFAULT_SELECTION,
  type GameBoard,
  type LevelState,
  type Node,
  type Selection,
} from "~src/models";

import { createSelectors } from "./store-utils";

type LevelStore = {
  activeLevelState: LevelState | null;
  selection: Selection;
  actions: {
    setActiveLevelState: (level: LevelState) => void;
    restartLevel: () => void;
    undoSelection: () => void;
    setInvalidNode: (node: Node | null) => void;
    updateGameBoard: (board: GameBoard) => void;
    setSelection: (selection: Selection) => void;
    resetSelection: () => void;
  };
};

export const levelStore = create<LevelStore>((set, get) => ({
  activeLevelState: null,
  selection: DEFAULT_SELECTION,
  actions: {
    setActiveLevelState: (activeLevelState) => {
      set({
        activeLevelState,
      });
    },
    restartLevel: () => {
      const { actions, activeLevelState } = get();
      const prev = activeLevelState!;

      actions.resetSelection();

      const { nodes, edges } = prev.history[0];

      set({
        activeLevelState: {
          ...prev,
          activeObjectiveIndex: 0,
          nodes,
          edges,
          history: [],
        },
      });
    },
    setInvalidNode: (node) => {
      const { activeLevelState, selection } = get();
      set({
        ...activeLevelState!,
        selection: { ...selection, invalidNode: node },
      });
    },
    updateGameBoard: ({ nodes, edges }) => {
      const prev = get().activeLevelState!;
      const history = [
        ...prev.history,
        structuredClone({ nodes: prev.nodes, edges: prev.edges }),
      ];

      const activeObjectiveIndex = prev.activeObjectiveIndex + 1;

      set({
        activeLevelState: {
          ...get().activeLevelState!,
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
      const { actions, activeLevelState } = get();
      const prev = activeLevelState!;

      actions.resetSelection();
      const activeObjectiveIndex = prev.activeObjectiveIndex - 1;

      const { nodes, edges } = prev.history[activeObjectiveIndex];
      const history = prev.history.slice(0, -1);

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
  },
}));

// TODO: Find solution for !

export const useLevelStore = createSelectors(levelStore);
