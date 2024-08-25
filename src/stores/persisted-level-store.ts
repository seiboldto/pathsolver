import { create } from "zustand";
import { persist } from "zustand/middleware";

import { VERSIONS } from "~src/lib";
import { type LevelState } from "~src/models";

import { createSelectors } from "./store-utils";

type PersistedLevelStore = {
  persistedLevel: LevelState | null;
  actions: {
    setPersistedLevel: (level: LevelState | null) => void;
  };
};

const persistedLevelStore = create(
  persist<
    PersistedLevelStore,
    [],
    [],
    Pick<PersistedLevelStore, "persistedLevel">
  >(
    (set) => ({
      persistedLevel: null,
      actions: {
        setPersistedLevel: (level) => set({ persistedLevel: level }),
      },
    }),
    {
      name: "persisted-level",
      partialize: (state) => ({ persistedLevel: state.persistedLevel }),
      version: VERSIONS.STORAGE.PERSISTED_LEVEL,
    }
  )
);

export const usePersistedLevelStore = createSelectors(persistedLevelStore);
