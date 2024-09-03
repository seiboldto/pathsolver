import prand, { type RandomGenerator } from "pure-rand";

import { OPERATION_KINDS, type OperationKind } from "./operation";

// Due to limitations with shareable ids, there must be less than 10 preset difficulties.
export const PRESET_DIFFICULTIES = ["normal", "hard", "extreme"] as const;
export type PresetDifficulty = (typeof PRESET_DIFFICULTIES)[number];

export type DifficultyOptions = {
  boardSize: number;
  operationDistribution: Partial<Record<OperationKind, number>>;
  maxPathLength: number;
  maxPathCount: number;
  preset: PresetDifficulty;
};

/** Defines the difficulty of a level.
 *
 * To create a custom difficulty, use the constructor.
 * Otherwise, you can use a predefined preset.
 */
export class Difficulty {
  public options: DifficultyOptions;

  constructor({
    boardSize,
    maxPathCount,
    maxPathLength,
    operationDistribution,
    preset,
  }: DifficultyOptions) {
    const weightsSum = Object.values(operationDistribution).reduce(
      (a, b) => a + b,
      0
    );
    const multiplier = 100 / weightsSum;
    const normalizedDistribution: DifficultyOptions["operationDistribution"] =
      {};
    for (const [k, value] of Object.entries(operationDistribution)) {
      const key = k as OperationKind;
      normalizedDistribution[key] = value * multiplier;
    }

    this.options = {
      boardSize,
      maxPathCount,
      maxPathLength,
      operationDistribution: normalizedDistribution,
      preset,
    };
  }

  /**
   * Generates a random operation based on the operation distribution.
   * @param rng - A random generator instance
   * @returns A random operation
   */
  public getRandomOperation(rng: RandomGenerator): OperationKind {
    const operations = Object.keys(
      this.options.operationDistribution
    ) as OperationKind[];
    const weights = Object.values(this.options.operationDistribution);

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
    return new Difficulty({
      boardSize: 3,
      maxPathLength: 4,
      maxPathCount: 3,
      operationDistribution: {
        addition: 70,
        subtraction: 30,
      },
      preset: "normal",
    });
  }

  /**
   * Preset hard difficulty.
   */
  static hard(): Difficulty {
    return new Difficulty({
      boardSize: 3,
      maxPathCount: 4,
      maxPathLength: 4,
      operationDistribution: {
        addition: 50,
        subtraction: 40,
        multiplication: 10,
      },
      preset: "hard",
    });
  }

  /**
   * Preset extreme difficulty.
   */
  static extreme(): Difficulty {
    return new Difficulty({
      boardSize: 4,
      maxPathLength: 5,
      maxPathCount: 8,
      operationDistribution: {
        addition: 65,
        subtraction: 20,
        multiplication: 10,
        division: 5,
      },
      preset: "extreme",
    });
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("normalizes the weight distribution", () => {
    const difficulty = new Difficulty({
      maxPathCount: 3,
      boardSize: 3,
      maxPathLength: 3,
      operationDistribution: {
        addition: 50,
        subtraction: 200,
        multiplication: 50,
        division: 100,
      },
      preset: "normal",
    });

    expect(difficulty.options.operationDistribution).toEqual({
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

      const difficulty = Difficulty[preset]();
      const operations: Partial<Record<OperationKind, number>> = {};
      const rng = prand.xoroshiro128plus(0);

      for (let i = 0; i < N; i++) {
        const kind = difficulty.getRandomOperation(rng);
        const currentValue = operations[kind] ?? 0;
        operations[kind] = currentValue + 1;
      }

      for (const kind of OPERATION_KINDS) {
        const expected =
          (difficulty.options.operationDistribution[kind] || 0) * (N / 100);
        const received = operations[kind] ?? 0;
        expect(Math.abs(received - expected)).toBeLessThan(DELTA);
      }
    }
  );
}
