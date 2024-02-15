import { expect, it, describe } from "vitest";
import prand from "pure-rand";

import { Difficulty } from "./difficulty";
import { Path } from "./path";

describe("Paths", () => {
  it.each([
    ["normal", Difficulty.normal()],
    ["hard", Difficulty.hard()],
    ["extreme", Difficulty.extreme()],
  ])(
    "generates correct path lengths for a board of size '%s'",
    (_name, difficulty) => {
      const rng = prand.xoroshiro128plus(0);

      const pathLengths = Path.getRandomPathLenghts(difficulty, rng);

      const sum = pathLengths.reduce((a, b) => a + b, 0);
      expect(sum).toEqual(Math.pow(difficulty.boardSize, 2));

      pathLengths.forEach((l) => {
        expect(l).toBeGreaterThanOrEqual(2);
        expect(l).toBeLessThanOrEqual(difficulty.maxPathLength);
      });
    },
  );
});
