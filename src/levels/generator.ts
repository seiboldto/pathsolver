import prand from "pure-rand";

import { Difficulty } from "./difficulty";
import { Level } from "./level";

/**
 * Generate a level from a random seed.
 * @param difficulty - The difficulty of the level.
 * @returns A random level.
 */
export function generateRandomLevel(difficulty: Difficulty): Level {
  const seed = Date.now() ^ (Math.random() * 0x100000000);
  return generateLevelFromSeed(seed, difficulty);
}

/**
 * Generates a level from a date.
 *
 * For the same date, this function will always return the same level.
 * @param date - A specified date to generate a level for.
 * @param difficulty - The difficulty of the level.
 * @returns A non-random level.
 */
export function generateLevelFromDate(
  date: Date,
  difficulty: Difficulty
): Level {
  const daysSinceEpoch = Math.floor(date.getTime() / 8.64e7);
  const seed = createSeedFromNumber(daysSinceEpoch);
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

/**
 * Create a seed from a given number.
 *
 * Adapted from https://stackoverflow.com/a/52171480.
 * @param n - The number to create a seed from.
 * @returns A non-random seed.
 */
function createSeedFromNumber(n: number): number {
  let h1 = 0xdeadbeef ^ 0;
  let h2 = 0x41c6ce57 ^ 0;

  h1 = Math.imul(h1 ^ n, 2654435761);
  h2 = Math.imul(h2 ^ n, 1597334677);

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("generates unique seed values for each day", () => {
    const ITERATIONS = 100_000;
    const seeds = new Set();

    for (let i = 0; i < ITERATIONS; i++) {
      seeds.add(createSeedFromNumber(i));
    }

    expect(seeds.size).toEqual(ITERATIONS);
  });
}
