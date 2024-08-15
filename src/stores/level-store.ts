import { create } from "zustand";

import type { Level, PresetDifficulty } from "~src/level-gen";
import { levelState } from "~src/level-state";
import {
  type Edge,
  type LevelState,
  type Node,
  type Selection,
  transformLevel,
} from "~src/models";

import { statisticsStore } from "./statistics-store";
import { createSelectors } from "./store-utils";

type LevelStore = {
  activeLevelState: LevelState | null;
  actions: {
    setActiveLevel: (level: Level) => void;
    restartLevel: () => void;
    undoSelection: () => void;
    setInvalidNode: (node: Node | null) => void;
    advanceObjectives: (nodes: Node[], edges: Edge[]) => void;
    checkForGameWin: (difficulty?: PresetDifficulty) => void;
    setSelection: (selection: Selection) => void;
    resetSelection: () => void;
  };
};

export const levelStore = create<LevelStore>((set, get) => ({
  activeLevelState: null,
  actions: {
    setActiveLevel: (level) => {
      set({
        activeLevelState: transformLevel(level),
      });
    },
    restartLevel: () => {
      const { level } = get().activeLevelState!;
      const { setActiveLevel } = get().actions;
      setActiveLevel(level);
    },
    setInvalidNode: (node) =>
      set({
        activeLevelState: { ...get().activeLevelState!, invalidNode: node },
      }),
    advanceObjectives: (nodes, edges) => {
      const prev = get().activeLevelState!;

      const activeObjectiveIndex = prev.activeObjectiveIndex + 1;

      const history = [
        ...prev.history,
        structuredClone({ nodes: prev.nodes, edges: prev.edges }),
      ];

      set({
        activeLevelState: {
          ...prev,
          activeObjectiveIndex,
          history,
          nodes,
          edges,
        },
      });
    },
    checkForGameWin: (difficulty) => {
      // Don't update stats for custom difficulty games.
      if (difficulty === undefined) return;

      const { activeObjectiveIndex, objectives, nodes } =
        get().activeLevelState!;
      const objectivesCount = objectives.length;

      const gameState = levelState.getGameState({
        activeObjectiveIndex,
        objectivesCount,
        nodes,
      });

      if (gameState.hasWon) {
        const { updateStats } = statisticsStore.getState().actions;
        updateStats(difficulty, gameState.state === "perfect-won");
      }
    },
    setSelection: (selection) =>
      set({ activeLevelState: { ...get().activeLevelState!, selection } }),
    resetSelection: () =>
      set({
        activeLevelState: {
          ...get().activeLevelState!,
          selection: { edges: [], nodes: [], value: null },
        },
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
