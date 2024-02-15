import { expect, it, describe } from "vitest";
import prand from "pure-rand";

import { Difficulty } from "./difficulty";
import { Path } from "./path";
import { Board } from "./board";
import { GenerationError } from "./error";
import { Operation } from "./operation";

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

  it("generates a connected path of the correct length", () => {
    const rng = prand.xoroshiro128plus(0);

    const board = Board.fromDifficulty(Difficulty.normal(), rng);
    const path = Path.getPath(board, 3, rng) as Path;

    expect(path).not.toBeInstanceOf(GenerationError);
    expect(path.indices).toHaveLength(3);

    const expectedResult = board.evaluateIndices(path.indices);

    expect(expectedResult).toEqual(path.result);
  });

  it("returns an error if no solutions exist", () => {
    const rng = prand.xoroshiro128plus(0);

    const board = Board.fromDifficulty(Difficulty.normal(), rng);
    board.applyPathAndCompress(new Path([1, 4, 7], 0));

    const error = Path.getPath(board, 4, rng) as GenerationError;
    expect(error).toBeInstanceOf(GenerationError);
    expect(error.id()).toEqual("no-possible-paths");
  });

  it("returns an error if a path contains an invalid operation", () => {
    const rng = prand.xoroshiro128plus(0);

    const nodes = Array.from<number>({ length: 9 }).fill(1);
    const edges = Array.from<Operation>({ length: 12 }).fill(
      new Operation("division"),
    );

    const board = new Board(Difficulty.normal(), nodes, edges);
    const error = Path.getPath(board, 3, rng) as GenerationError;
    expect(error).toBeInstanceOf(GenerationError);
    expect(error.id()).toEqual("invalid-division");
  });
});
