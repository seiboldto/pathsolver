import type { RandomGenerator } from "pure-rand";
import prand from "pure-rand";

import { Board } from "./board";
import { Difficulty } from "./difficulty";
import { GenerationError, type GenerationResult } from "./error";
import { Path } from "./path";

export class Level {
  public board: Board;
  public paths: Path[];
  public seed: number;

  constructor(board: Board, paths: Path[], seed: number) {
    this.board = board;
    this.paths = paths;
    this.seed = seed;
  }

  /**
   * Generates a random level.
   * @param difficulty - The current difficulty.
   * @param rng - A random generator instance
   * @returns A level instance.
   */
  public static fromDifficulty(
    difficulty: Difficulty,
    rng: RandomGenerator,
    seed: number
  ): GenerationResult<Level> {
    const board = Board.fromDifficulty(difficulty, rng);
    const paths: Path[] = [];

    const pathLengths = Path.getRandomPathLenghts(difficulty, rng);
    if (pathLengths instanceof GenerationError) return pathLengths;

    for (const length of pathLengths) {
      const path = Path.getPath(board, length, rng);
      if (path instanceof GenerationError) return path;

      board.applyPathAndCompress(path);
      paths.push(path);
    }

    return new Level(board, paths, seed);
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("generates correct levels", () => {
    for (let i = 0; i < 100; i++) {
      const rng = prand.xorshift128plus(i);
      const level = Level.fromDifficulty(Difficulty.normal(), rng, 0);

      if (level instanceof Level) {
        const board = new Board(
          Difficulty.normal(),
          level.board.nodes,
          level.board.edges
        );

        for (const path of level.paths) {
          expect(path.result).toEqual(path.evaluatePath(board));

          board.applyPathAndCompress(path);
        }

        board.simulatedNodes.forEach((n) => expect(n).toEqual(0));
      }
    }
  });
}
