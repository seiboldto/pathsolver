import { useLocation } from "wouter";

import {
  Difficulty,
  generateRandomLevel,
  type PresetDifficulty,
} from "~src/level-gen";
import { useLevelStore } from "~src/stores";

export const useGenerateLevel = () => {
  const [, setLocation] = useLocation();

  const { setActiveLevel } = useLevelStore.use.actions();

  const playRandomLevel = (difficulty: PresetDifficulty | Difficulty) => {
    const diff =
      typeof difficulty === "string" ? Difficulty[difficulty]() : difficulty;
    const level = generateRandomLevel(diff);

    setActiveLevel(level);
    setLocation("/level");
  };

  return { playRandomLevel };
};
