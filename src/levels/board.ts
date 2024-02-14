import prand, { type RandomGenerator } from "pure-rand";

import { Difficulty } from "./difficulty";
import { Operation } from "./operation";

export class Board {
  /**
   * Difficulty from which the board was generated.
   */
  public difficulty: Difficulty;
  /** Nodes on the board, from top left to bottom right. */
  public nodes: number[];
  /** Edges of the board.
   * To get the edge between two nodes, use the `indexOfEdgeBetween(...)` method.
   */
  public edges: Operation[];

  constructor(difficulty: Difficulty, rng: RandomGenerator) {
    this.difficulty = difficulty;
    this.nodes = Array.from({ length: Math.pow(difficulty.boardSize, 2) }).map(
      () => prand.unsafeUniformIntDistribution(1, 9, rng),
    );

    const edgeCount =
      2 * Math.pow(difficulty.boardSize, 2) - 2 * difficulty.boardSize;
    this.edges = Array.from({ length: edgeCount }).map(() => {
      const op = difficulty.getRandomOperation(rng);
      return new Operation(op);
    });
  }

  /**
   * Calculates the index of the edge between two nodes.
   * @param i1 - The index of the first node
   * @param i2 - The index of the second node
   * @returns The index of the edge between i1 and i2
   */
  public indexOfEdgeBetween(i1: number, i2: number): number {
    const lower = Math.min(i1, i2);
    const { boardSize } = this.difficulty;

    if (Math.abs(i1 - i2) === 1) {
      const row = Math.trunc(i1 / boardSize);
      return row * (boardSize - 1) + (lower - row * boardSize);
    } else {
      const verticalDifference = Math.pow(boardSize, 2) - boardSize;
      return lower + verticalDifference;
    }
  }
}
