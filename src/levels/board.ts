import prand, { type RandomGenerator } from "pure-rand";

import { type Difficulty } from "./difficulty";
import { Operation } from "./operation";
import { type Path } from "./path";

export class Board {
  /**
   * Difficulty from which the board was generated.
   */
  public difficulty: Difficulty;
  /**
   * Nodes on the board, from top left to bottom right.
   */
  public nodes: number[];
  /**
   * Edges of the board.
   * To get the edge between two nodes, use the `indexOfEdgeBetween(...)` method.
   */
  public edges: Operation[];
  /**
   * Simulated Nodes.
   */
  public simulatedNodes: number[];

  constructor(difficulty: Difficulty, nodes: number[], edges: Operation[]) {
    this.difficulty = difficulty;
    this.nodes = nodes;
    this.simulatedNodes = [...nodes];
    this.edges = edges;
  }

  /**
   * Generates a random board.
   * @param difficulty - The current difficulty.
   * @param rng - A random generator instance
   * @returns A board instance.
   */
  public static fromDifficulty(
    difficulty: Difficulty,
    rng: RandomGenerator,
  ): Board {
    const nodes = Array.from({ length: Math.pow(difficulty.boardSize, 2) }).map(
      () => prand.unsafeUniformIntDistribution(1, 9, rng),
    );

    const edgeCount =
      2 * Math.pow(difficulty.boardSize, 2) - 2 * difficulty.boardSize;
    const edges = Array.from({ length: edgeCount }).map(() => {
      const op = difficulty.getRandomOperation(rng);
      return new Operation(op);
    });

    return new Board(difficulty, nodes, edges);
  }

  /**
   * For all remaining nodes, get a list of non-empty neighbour indices.
   * @returns A key-value store where the key is the index of a non-empty node and the value is an array of all non-empty neighbour indices, starting at the top and going clockwise.
   */
  public neighbourIndicesOfRemainingNodes(): Record<string, number[]> {
    const remainingIndices = this.simulatedNodes
      .map((n, i) => (n === 0 ? null : i))
      .filter<number>((n): n is number => n !== null);

    const neighbourIndices: Record<string, number[]> = {};

    const { boardSize } = this.difficulty;
    for (const index of remainingIndices) {
      const neighbours: number[] = [];

      const top = index - boardSize;
      const bottom = index + boardSize;
      const left = index - 1;
      const right = index + 1;
      const isIndexFilled = (i: number) => this.simulatedNodes[i] !== 0;
      const row = Math.trunc(index / boardSize);
      const column = index % boardSize;

      if (row > 0 && isIndexFilled(top)) neighbours.push(top);
      if (column !== boardSize - 1 && isIndexFilled(right))
        neighbours.push(right);
      if (row < boardSize - 1 && isIndexFilled(bottom)) neighbours.push(bottom);
      if (column !== 0 && isIndexFilled(left)) neighbours.push(left);

      neighbourIndices[index.toString()] = neighbours;
    }

    return neighbourIndices;
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

  /**
   * Evalute a path of indices, given the current boards state.
   * This function should only be used when you are sure that a path only includes valid operations.
   * @param indices - The path to evaluate.
   * @returns The result of the path.
   */
  public evaluateIndices(indices: number[]): number {
    let expectedResult: number = this.simulatedNodes[indices[0]];
    for (let i = 1; i < indices.length; i++) {
      const index = indices[i];
      const prevIndex = indices[i - 1];

      const edgeIndex = this.indexOfEdgeBetween(index, prevIndex);
      const operation = this.edges[edgeIndex];
      const result = operation.apply(
        expectedResult,
        this.simulatedNodes[index],
      ) as number;
      expectedResult = result;
    }

    return expectedResult;
  }

  /**
   * Applies a path to the simulated nodes, removing every node the path contains.
   * Afterwards, gravity is simulated to compress the board.
   * @param path - The path to apply.
   */
  public applyPathAndCompress(path: Path) {
    const filteredNodes = this.simulatedNodes.map((n, i) =>
      path.indices.includes(i) ? 0 : n,
    );

    const { boardSize } = this.difficulty;
    for (let column = 0; column < boardSize; column++) {
      for (let row = boardSize - 2; row >= 0; row--) {
        let index = row * boardSize + column;
        const bottomColumnIndex = (boardSize - 1) * boardSize + column;
        while (index !== bottomColumnIndex) {
          if (filteredNodes[index + boardSize] === 0) {
            filteredNodes[index + boardSize] = filteredNodes[index];
            filteredNodes[index] = 0;
            index += boardSize;
          } else {
            index = bottomColumnIndex;
          }
        }
      }
    }

    this.simulatedNodes = filteredNodes;
  }
}
