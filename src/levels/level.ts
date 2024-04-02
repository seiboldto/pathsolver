import type { RandomGenerator } from "pure-rand";
import prand from "pure-rand";

import { Board } from "./board";
import { Difficulty } from "./difficulty";
import { GenerationError, type GenerationResult } from "./error";
import { Path } from "./path";

export class Level {
  /**
   * The board of the level.
   */
  public board: Board;
  /**
   * The paths of the level.
   */
  public paths: Path[];

  constructor(board: Board, paths: Path[]) {
    this.board = board;
    this.paths = paths;
  }

  /**
   * Generates a random level.
   * @param difficulty - The current difficulty.
   * @param rng - A random generator instance
   * @returns A level instance.
   */
  public static fromDifficulty(
    difficulty: Difficulty,
    rng: RandomGenerator
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

    return new Level(board, paths);
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("generates correct levels", () => {
    for (let i = 0; i < 100; i++) {
      const rng = prand.xorshift128plus(i);
      const level = Level.fromDifficulty(Difficulty.normal(), rng);

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
