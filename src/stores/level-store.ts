import { create } from "zustand";

import type { Level } from "~src/levels";
import { type LevelState, transformEdges, transformNodes } from "~src/models";

import { createSelectors } from "./store-utils";

type LevelStore = {
  activeLevelState: LevelState | null;
  actions: {
    setActiveLevel: (level: Level) => void;
    setActiveLevelState: (
      func: (prev: LevelState) => Partial<LevelState>
    ) => void;
  };
};

const levelStore = create<LevelStore>((set, get) => ({
  activeLevelState: null,
  actions: {
    setActiveLevel: (level) => {
      set({
        activeLevelState: {
          level,
          nodes: transformNodes(level.board),
          edges: transformEdges(level.board),
          selectedNodes: [],
        },
      });
    },
    setActiveLevelState: (func) => {
      const prev = get().activeLevelState;
      if (prev === null)
        throw new Error("activeLevel may only be used on the Level screen.");

      set({
        activeLevelState: { ...prev, ...func(prev) },
      });
    },
  },
}));

export const useLevelStore = createSelectors(levelStore);
