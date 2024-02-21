import prand, { type RandomGenerator } from "pure-rand";

import { type Difficulty } from "./difficulty";
import { GenerationError, type GenerationResult } from "./error";
import { type Board } from "./board";

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

  public static getPath(
    board: Board,
    length: number,
    rng: RandomGenerator,
  ): GenerationResult<Path> {
    const neighbourIndicesOfRemainingNodes =
      board.neighbourIndicesOfRemainingNodes();
    const remainingIndices = Object.keys(neighbourIndicesOfRemainingNodes).map(
      (k) => parseInt(k),
    );

    const firstIndex = prand.unsafeUniformIntDistribution(
      0,
      remainingIndices.length - 1,
      rng,
    );

    const indices = [remainingIndices[firstIndex]];
    let result = board.simulatedNodes[remainingIndices[firstIndex]];

    while (indices.length !== length) {
      const last = indices[indices.length - 1];
      const neighbours = neighbourIndicesOfRemainingNodes[last];

      const filtered = neighbours.filter((n) => !indices.includes(n));
      if (filtered.length === 0)
        return new GenerationError({
          id: "no-possible-paths",
          length,
          nodes: board.simulatedNodes,
        });

      const random = prand.unsafeUniformIntDistribution(
        0,
        filtered.length - 1,
        rng,
      );
      const next = filtered[random];
      indices.push(next);

      const operation = board.edgeBetween(last, next);

      const newResult = operation.apply(result, board.simulatedNodes[next]);

      if (newResult instanceof GenerationError) return newResult;
      result = newResult;
    }

    return new Path(indices, result);
  }
}
