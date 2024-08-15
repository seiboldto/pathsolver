import { expect, it } from "vitest";

import { Difficulty, generateRandomLevel } from ".";

it("generates a completely random level every time", () => {
  const ITERATIONS = 100;
  const generatedLevels = new Set();

  for (let i = 0; i < ITERATIONS; i++) {
    const level = generateRandomLevel(Difficulty.normal());
    generatedLevels.add(level);
  }

  expect(generatedLevels.size).toEqual(ITERATIONS);
});
