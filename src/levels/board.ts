import prand, { type RandomGenerator } from "pure-rand";

import { Difficulty } from "./difficulty";
import { Operation } from "./operation";
import { Path } from "./path";

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
    rng: RandomGenerator
  ): Board {
    const nodes = Array.from({ length: Math.pow(difficulty.boardSize, 2) }).map(
      () => prand.unsafeUniformIntDistribution(1, 9, rng)
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
   * Applies a path to the simulated nodes, removing every node the path contains.
   * Afterwards, gravity is simulated to compress the board.
   * @param path - The path to apply.
   */
  public applyPathAndCompress(path: Path) {
    const filteredNodes = this.simulatedNodes.map((n, i) =>
      path.indices.includes(i) ? 0 : n
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

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("generates a board correctly", () => {
    const board = Board.fromDifficulty(
      Difficulty.hard(),
      prand.xoroshiro128plus(0)
    );

    expect(board.difficulty).toEqual(Difficulty.hard());

    expect(board.nodes).toHaveLength(9);
    board.nodes.forEach((n) => expect(n).toBeLessThan(10));

    expect(board.edges).toHaveLength(12);
    expect(board.edges).not.toEqual(expect.arrayContaining(["division"]));
  });

  it.each([
    // Horizontal edges
    [0, 1, 0],
    [1, 2, 1],
    [3, 4, 2],
    [4, 5, 3],
    [6, 7, 4],
    [7, 8, 5],
    // Vertical edges
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [4, 7, 10],
    [5, 8, 11],
  ])("it calculates the edge index between %i and %i", (i1, i2, expected) => {
    const board = Board.fromDifficulty(
      Difficulty.hard(),
      prand.xoroshiro128plus(0)
    );
    expect(board.indexOfEdgeBetween(i1, i2)).toEqual(expected);
  });

  it("applies paths and compress the board correctly", () => {
    const board = Board.fromDifficulty(
      Difficulty.extreme(),
      prand.xoroshiro128plus(0)
    );
    const path = new Path([4, 5, 1, 2, 3, 7, 11, 10], 0);
    board.applyPathAndCompress(path);

    const expectedEmptyIndices = [0, 1, 2, 3, 5, 6, 7, 11];
    expectedEmptyIndices.forEach((i) => {
      expect(board.simulatedNodes[i]).toEqual(0);
    });
  });

  it("returns the correct neighbours of remaining nodes", () => {
    const board = Board.fromDifficulty(
      Difficulty.normal(),
      prand.xoroshiro128plus(0)
    );
    const path = new Path([1, 0, 3], 0);
    board.applyPathAndCompress(path);

    const neighbourIndices = board.neighbourIndicesOfRemainingNodes();
    const expectedNeighbourIndices = {
      "2": [5],
      "4": [5, 7],
      "5": [2, 8, 4],
      "6": [7],
      "7": [4, 8, 6],
      "8": [5, 7],
    };
    expect(neighbourIndices).toEqual(expectedNeighbourIndices);
  });
}
