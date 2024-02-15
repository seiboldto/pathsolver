import { describe, expect, it } from "vitest";
import prand from "pure-rand";

import { Difficulty } from "./difficulty";
import { type OperationKind } from "./operation";

describe("Difficulty", () => {
  it.each<{
    difficulty: "normal" | "hard" | "extreme";
    boardSize: number;
    maxPathLength: number;
    operationDistribution: Record<OperationKind, number>;
  }>([
    {
      difficulty: "normal",
      boardSize: 3,
      maxPathLength: 4,
      operationDistribution: {
        addition: 70,
        subtraction: 30,
        multiplication: 0,
        division: 0,
      },
    },
    {
      difficulty: "hard",
      boardSize: 3,
      maxPathLength: 4,
      operationDistribution: {
        addition: 65,
        subtraction: 25,
        multiplication: 10,
        division: 0,
      },
    },
    {
      difficulty: "extreme",
      boardSize: 4,
      maxPathLength: 5,
      operationDistribution: {
        addition: 65,
        subtraction: 20,
        multiplication: 10,
        division: 5,
      },
    },
  ])(
    "returns the correct $difficulty preset",
    ({ difficulty, boardSize, operationDistribution, maxPathLength }) => {
      const d = Difficulty[difficulty]();
      expect(d.boardSize).toEqual(boardSize);
      expect(d.maxPathLength).toEqual(maxPathLength);
      expect(d.operationDistribution).toEqual(operationDistribution);
    },
  );

  it("generates random operations according to specified weights", () => {
    const N = 1_000;
    const DELTA = N / 10 / 2;

    const operations: Partial<Record<OperationKind, number>> = {};

    const difficulty = Difficulty.extreme();
    const rng = prand.xoroshiro128plus(0);

    for (let i = 0; i < N; i++) {
      const op = difficulty.getRandomOperation(rng);
      const cur = operations[op] ?? 0;
      operations[op] = cur + 1;
    }

    for (const k of Object.keys(difficulty.operationDistribution)) {
      const key = k as OperationKind;
      const expected = difficulty.operationDistribution[key] * (N / 100);
      const received = operations[key] ?? 0;
      expect(Math.abs(received - expected)).toBeLessThan(DELTA);
    }
  });
});
