import prand, { type RandomGenerator } from "pure-rand";

import { type OperationKind } from "./operation";

/** Defines the difficulty of a level.
 *
 * To create a custom difficulty, use the constructor.
 * Otherwise, you can use a predefined preset.
 *
 * | ID      | Board Size | Operation Distribution         |
 * |---------|------------|--------------------------------|
 * | Normal  | 3          | + (70%) - (30%)                |
 * | Hard    | 3          | + (65%) - (25%) * (10%)        |
 * | Extreme | 4          | + (65%) - (20%) * (10%) / (5%) |
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

  constructor(
    boardSize: number,
    operationDistribution: Partial<Record<OperationKind, number>>,
  ) {
    this.boardSize = boardSize;

    const weightsSum = Object.values(operationDistribution).reduce(
      (a, b) => a + b,
      0,
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
      this.operationDistribution,
    ) as OperationKind[];
    const weights = Object.values(this.operationDistribution);

    const summedWeights = [weights[0]];
    for (let i = 1; i < weights.length; i++)
      summedWeights[i] = summedWeights[i - 1] + weights[i];

    const random = prand.unsafeUniformIntDistribution(
      0,
      summedWeights[summedWeights.length - 1],
      rng,
    );

    let i = 0;
    while (summedWeights[i] < random) i++;

    return operations[i];
  }

  /**
   * Preset normal difficulty.
   */
  static normal(): Difficulty {
    return new Difficulty(3, { addition: 70, subtraction: 30 });
  }

  /**
   * Preset hard difficulty.
   */
  static hard(): Difficulty {
    return new Difficulty(3, {
      addition: 65,
      subtraction: 25,
      multiplication: 10,
    });
  }

  /**
   * Preset extreme difficulty.
   */
  static extreme(): Difficulty {
    return new Difficulty(4, {
      addition: 65,
      subtraction: 20,
      multiplication: 10,
      division: 5,
    });
  }
}
