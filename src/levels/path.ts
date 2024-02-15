import prand, { type RandomGenerator } from "pure-rand";

import { type Difficulty } from "./difficulty";

export class Path {
  /** The indices this path touches. */
  public indices: number[] = [];
  /** The result of the path. */
  public result: number = 5;

  constructor(indices: number[], result: number) {
    this.indices = indices;
    this.result = result;
  }

  /**
   * Generates random path lengths to fill out the board.
   * @param difficulty - The current difficulty.
   * @param rng - A random generator instance
   * @returns A list of path lengths.
   */
  public static getRandomPathLenghts(
    difficulty: Difficulty,
    rng: RandomGenerator,
  ): number[] {
    const nodeCount = Math.pow(difficulty.boardSize, 2);

    const pathLengths = [];
    let sum = 0;
    while (sum !== nodeCount) {
      pathLengths.length = 0;
      sum = 0;

      while (sum < nodeCount) {
        const length = prand.unsafeUniformIntDistribution(
          2,
          difficulty.maxPathLength,
          rng,
        );
        pathLengths.push(length);
        sum += length;
      }
    }

    return pathLengths;
  }
}
