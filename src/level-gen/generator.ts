import prand from "pure-rand";

import { Difficulty } from "./difficulty";
import { Level } from "./level";

/**
 * Generate a level from a random seed.
 * @param difficulty - The difficulty of the level.
 * @returns A random level.
 */
export function generateRandomLevel(difficulty: Difficulty): Level {
  const seed = generateRandomSeed();
  return generateLevelFromSeed(seed, difficulty);
}

/**
 * Generate a level from a seed.
 * @param seed - The seed to start generation from.
 * @param difficulty - The difficulty of the level.
 * @returns A non-random level.
 */
export function generateLevelFromSeed(
  seed: number,
  difficulty: Difficulty
): Level {
  let level: Level | null = null;
  while (!level) {
    const rng = prand.xoroshiro128plus(seed);
    const result = Level.fromDifficulty(difficulty, rng, seed);
    if (result instanceof Level) level = result;
    else seed++;
  }

  return level;
}

export const SEED_LENGTH = 10;

/**
 * Create a random seed with a preconfigured length.
 * @returns A random seed.
 */
export function generateRandomSeed(): number {
  const lowerBound = Math.pow(10, SEED_LENGTH - 1);
  const upperBound = Math.pow(10, SEED_LENGTH) - 1;

  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("creates random seeds", () => {
    const ITERATIONS = 10000;

    for (let i = 0; i < ITERATIONS; i++) {
      const seed = generateRandomSeed();

      const lowerBound = 1000000000;
      const upperBound = 9999999999;
      expect(seed).toBeGreaterThanOrEqual(lowerBound);
      expect(seed).toBeLessThanOrEqual(upperBound);
    }
  });
}
