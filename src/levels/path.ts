import prand, { type RandomGenerator } from "pure-rand";

import { Board } from "./board";
import { Difficulty } from "./difficulty";
import { GenerationError, type GenerationResult } from "./error";
import { Operation } from "./operation";

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
   * Apply a path to a given board state and evaluate it.
   * @param board - The board state.
   * @returns The result of the path.
   */
  public evaluatePath(board: Board): number {
    let expectedResult = board.simulatedNodes[this.indices[0]];
    for (let i = 1; i < this.indices.length; i++) {
      const index = this.indices[i];
      const prevIndex = this.indices[i - 1];

      const operation = board.edges[board.indexOfEdgeBetween(index, prevIndex)];
      const result = operation.apply(
        expectedResult,
        board.simulatedNodes[index]
      );
      expectedResult = result;
    }

    return expectedResult;
  }

  /**
   * Generates random path lengths to fill out the board.
   * @param difficulty - The current difficulty.
   * @param rng - A random generator instance.
   * @returns A list of path lengths.
   */
  public static getRandomPathLenghts(
    difficulty: Difficulty,
    rng: RandomGenerator
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
          rng
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
    rng: RandomGenerator
  ): GenerationResult<Path> {
    const neighbourIndicesOfRemainingNodes =
      board.neighbourIndicesOfRemainingNodes();
    const remainingIndices = Object.keys(neighbourIndicesOfRemainingNodes).map(
      (k) => parseInt(k)
    );

    const firstIndex = prand.unsafeUniformIntDistribution(
      0,
      remainingIndices.length - 1,
      rng
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
        rng
      );
      const next = filtered[random];
      indices.push(next);

      const operation = board.edges[board.indexOfEdgeBetween(last, next)];

      if (operation.kind === "division") {
        const n1 = board.simulatedNodes[last];
        const n2 = board.simulatedNodes[next];
        if (n2 > n1 || n2 === 1)
          return new GenerationError({ id: "invalid-division", n1, n2 });
      }

      result = operation.apply(result, board.simulatedNodes[next]);
    }

    if (result === 0) {
      return new GenerationError({ id: "zero-result" });
    }

    return new Path(indices, result);
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

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
    }
  );

  it("evaluates a path correctly", () => {
    const nodes = Array.from<number>({ length: 9 }).fill(1);
    const edges = Array.from<Operation>({ length: 12 }).fill(
      new Operation("addition")
    );

    const board = new Board(Difficulty.normal(), nodes, edges);

    const path = new Path([0, 1, 2], 3);
    expect(path.evaluatePath(board)).toEqual(3);
  });

  it("generates a connected path of the correct length", () => {
    const rng = prand.xoroshiro128plus(0);

    const board = Board.fromDifficulty(Difficulty.normal(), rng);
    const path = Path.getPath(board, 3, rng) as Path;

    expect(path).not.toBeInstanceOf(GenerationError);
    expect(path.indices).toHaveLength(3);

    expect(path.evaluatePath(board)).toEqual(path.result);
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
      new Operation("division")
    );

    const board = new Board(Difficulty.normal(), nodes, edges);
    const error = Path.getPath(board, 3, rng) as GenerationError;
    expect(error).toBeInstanceOf(GenerationError);
    expect(error.id()).toEqual("invalid-division");
  });

  it("returns an error if a path returns zero", () => {
    const rng = prand.xoroshiro128plus(0);

    const nodes = Array.from<number>({ length: 9 }).fill(5);
    const edges = Array.from<Operation>({ length: 12 }).fill(
      new Operation("subtraction")
    );

    const difficulty = new Difficulty(3, 3, { addition: 100 });
    const board = new Board(difficulty, nodes, edges);

    const error = Path.getPath(board, 2, rng) as GenerationError;
    expect(error).toBeInstanceOf(GenerationError);
    expect(error.id()).toEqual("zero-result");
  });
}
