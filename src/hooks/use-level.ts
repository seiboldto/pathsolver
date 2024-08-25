import { useCallback } from "react";
import { useLocation } from "wouter";

import {
  Difficulty,
  generateRandomLevel,
  type PresetDifficulty,
} from "~src/level-gen";
import { transformLevel } from "~src/models";
import { levelStore, useLevelStore, usePersistedLevelStore } from "~src/stores";

export const useLevel = () => {
  const [, setLocation] = useLocation();

  const { setActiveLevelState } = useLevelStore.use.actions();

  const persistedLevel = usePersistedLevelStore.use.persistedLevel();
  const { setPersistedLevel } = usePersistedLevelStore.use.actions();
  const persistedLevelDifficulty =
    persistedLevel?.difficultyOptions.preset || null;

  const updatePersistedLevel = useCallback(() => {
    const { activeLevelState } = levelStore.getState();
    setPersistedLevel(activeLevelState);
  }, [setPersistedLevel]);

  const deletePersistedLevel = useCallback(() => {
    setPersistedLevel(null);
  }, [setPersistedLevel]);

  const playPersistedLevel = () => {
    if (!persistedLevel) return;

    setActiveLevelState(persistedLevel);
    updatePersistedLevel();
    setLocation("/level");
  };

  const playRandomLevel = (difficulty: PresetDifficulty) => {
    const level = generateRandomLevel(Difficulty[difficulty]());

    const levelState = transformLevel(level);

    setActiveLevelState(levelState);
    updatePersistedLevel();
    setLocation("/level");
  };

  return {
    persistedLevelDifficulty,
    playPersistedLevel,
    playRandomLevel,
    updatePersistedLevel,
    deletePersistedLevel,
  };
};
