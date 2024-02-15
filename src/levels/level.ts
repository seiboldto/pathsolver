import type { RandomGenerator } from "pure-rand";

import { Board } from "./board";
import { Path } from "./path";
import { type Difficulty } from "./difficulty";
import { GenerationError, type GenerationResult } from "./error";

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
    rng: RandomGenerator,
  ): GenerationResult<Level> {
    const board = Board.fromDifficulty(difficulty, rng);
    const paths: Path[] = [];

    const pathLengths = Path.getRandomPathLenghts(difficulty, rng);
    for (const length of pathLengths) {
      const path = Path.getPath(board, length, rng);
      if (path instanceof GenerationError) return path;

      board.applyPathAndCompress(path);
      paths.push(path);
    }

    return new Level(board, paths);
  }
}
