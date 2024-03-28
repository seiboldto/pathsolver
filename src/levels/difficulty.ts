import prand, { type RandomGenerator } from "pure-rand";

import { OPERATION_KINDS, type OperationKind } from "./operation";

export const PRESET_DIFFICULTIES = ["normal", "hard", "extreme"] as const;
type PresetDifficulty = (typeof PRESET_DIFFICULTIES)[number];

/** Defines the difficulty of a level.
 *
 * To create a custom difficulty, use the constructor.
 * Otherwise, you can use a predefined preset.
 *
 * | ID      | Board Size | Operation Distribution         | Max Path Length |
 * |---------|------------|--------------------------------|-----------------|
 * | Normal  | 3          | + (70%) - (30%)                | 4               |
 * | Hard    | 3          | + (65%) - (25%) * (10%)        | 4               |
 * | Extreme | 4          | + (65%) - (20%) * (10%) / (5%) | 5               |
 */
export class Difficulty {
  /** Size of the board.
   * Note that this is **not** the amount of nodes, which would be `boardSize * boardSize`.
   */
  public boardSize: number;
  /**
   * Key-Value Store of the distributions of all operations, normalized to 100.
   */
  public operationDistribution: Record<OperationKind, number>;
  /** Maximum length of a path. */
  public maxPathLength: number;

  /** Preset Difficulties */
  public static presets: Record<PresetDifficulty, Difficulty> = {
    normal: Difficulty.normal(),
    hard: Difficulty.hard(),
    extreme: Difficulty.extreme(),
  };

  constructor(
    boardSize: number,
    maxPathLength: number,
    operationDistribution: Partial<Record<OperationKind, number>>
  ) {
    this.boardSize = boardSize;
    this.maxPathLength = maxPathLength;

    const weightsSum = Object.values(operationDistribution).reduce(
      (a, b) => a + b,
      0
    );
    const multiplier = 100 / weightsSum;
    const normalizedDistribution: Record<OperationKind, number> = {
      addition: 0,
      subtraction: 0,
      multiplication: 0,
      division: 0,
    };
    for (const [k, value] of Object.entries(operationDistribution)) {
      const key = k as OperationKind;
      normalizedDistribution[key] = value * multiplier;
    }

    this.operationDistribution = normalizedDistribution;
  }

  /**
   * Generates a random operation based on the operation distribution.
   * @param rng - A random generator instance
   * @returns A random operation
   */
  public getRandomOperation(rng: RandomGenerator): OperationKind {
    const operations = Object.keys(
      this.operationDistribution
    ) as OperationKind[];
    const weights = Object.values(this.operationDistribution);

    const summedWeights = [weights[0]];
    for (let i = 1; i < weights.length; i++)
      summedWeights[i] = summedWeights[i - 1] + weights[i];

    const random = prand.unsafeUniformIntDistribution(
      0,
      summedWeights[summedWeights.length - 1],
      rng
    );

    let i = 0;
    while (summedWeights[i] < random) i++;

    return operations[i];
  }

  /**
   * Preset normal difficulty.
   */
  static normal(): Difficulty {
    return new Difficulty(3, 4, { addition: 70, subtraction: 30 });
  }

  /**
   * Preset hard difficulty.
   */
  static hard(): Difficulty {
    return new Difficulty(3, 4, {
      addition: 65,
      subtraction: 25,
      multiplication: 10,
    });
  }

  /**
   * Preset extreme difficulty.
   */
  static extreme(): Difficulty {
    return new Difficulty(4, 5, {
      addition: 65,
      subtraction: 20,
      multiplication: 10,
      division: 5,
    });
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("normalizes the weight distribution", () => {
    const difficulty = new Difficulty(3, 3, {
      addition: 50,
      subtraction: 200,
      multiplication: 50,
      division: 100,
    });

    expect(difficulty.operationDistribution).toEqual({
      addition: 12.5,
      subtraction: 50,
      multiplication: 12.5,
      division: 25,
    });
  });

  it.each<PresetDifficulty>(["normal", "hard", "extreme"])(
    "generates random operations with %s weights",
    (preset) => {
      const N = 1000;
      const DELTA = N / 10 / 2;

      const difficulty = Difficulty.presets[preset];
      const operations: Partial<Record<OperationKind, number>> = {};
      const rng = prand.xoroshiro128plus(0);

      for (let i = 0; i < N; i++) {
        const kind = difficulty.getRandomOperation(rng);
        const currentValue = operations[kind] ?? 0;
        operations[kind] = currentValue + 1;
      }

      for (const kind of OPERATION_KINDS) {
        const expected = difficulty.operationDistribution[kind] * (N / 100);
        const received = operations[kind] ?? 0;
        expect(Math.abs(received - expected)).toBeLessThan(DELTA);
      }
    }
  );
}
