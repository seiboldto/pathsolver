import { useCallback } from "react";

import {
  Difficulty,
  generateLevelFromSeed,
  generateRandomLevel,
  type PresetDifficulty,
} from "~src/level-gen";
import { LevelState, transformLevel } from "~src/models";
import { levelStore, useLevelStore, usePersistedLevelStore } from "~src/stores";

import { useNavigation } from "./use-navigation";

export const useLevel = () => {
  const { setActiveLevelState } = useLevelStore.use.actions();

  const { handleLevelNavigation } = useNavigation();

  const persistedLevel = usePersistedLevelStore.use.persistedLevel();
  const { setPersistedLevel } = usePersistedLevelStore.use.actions();
  const persistedLevelDifficulty =
    persistedLevel?.difficultyOptions.preset || null;
  const persistedLevelSeed = persistedLevel?.seed || null;

  const updatePersistedLevel = useCallback(() => {
    const { activeLevelState } = levelStore.getState();
    setPersistedLevel(activeLevelState);
  }, [setPersistedLevel]);

  const deletePersistedLevel = useCallback(() => {
    setPersistedLevel(null);
  }, [setPersistedLevel]);

  const playLevel = (level: LevelState) => {
    setActiveLevelState(level);
    updatePersistedLevel();
    handleLevelNavigation();
  };

  const playPersistedLevel = () => {
    if (!persistedLevel) return;
    playLevel(persistedLevel);
  };

  const playRandomLevel = (difficultyPreset: PresetDifficulty) => {
    const level = generateRandomLevel(Difficulty[difficultyPreset]());
    const levelState = transformLevel(level);
    playLevel(levelState);
  };

  const playSharedLevel = (
    seed: number,
    difficultyPreset: PresetDifficulty
  ) => {
    const level = generateLevelFromSeed(seed, Difficulty[difficultyPreset]());
    const levelState = transformLevel(level);
    playLevel(levelState);
  };

  return {
    persistedLevelDifficulty,
    persistedLevelSeed,
    playPersistedLevel,
    playRandomLevel,
    playSharedLevel,
    updatePersistedLevel,
    deletePersistedLevel,
  };
};
