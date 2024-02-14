import { describe, expect, it } from "vitest";

import { Difficulty } from "./difficulty";
import { type OperationKind } from "./operation";

describe("Difficulty", () => {
  it.each<{
    difficulty: "normal" | "hard" | "extreme";
    boardSize: number;
    possibleOperations: OperationKind[];
  }>([
    {
      difficulty: "normal",
      boardSize: 3,
      possibleOperations: ["addition", "subtraction"],
    },
    {
      difficulty: "hard",
      boardSize: 3,
      possibleOperations: ["addition", "subtraction", "multiplication"],
    },
    {
      difficulty: "extreme",
      boardSize: 4,
      possibleOperations: [
        "addition",
        "subtraction",
        "multiplication",
        "division",
      ],
    },
  ])(
    "returns the correct $difficulty preset",
    ({ difficulty, boardSize, possibleOperations }) => {
      const d = Difficulty[difficulty]();
      expect(d.boardSize).toEqual(boardSize);
      expect(d.possibleOperations).toEqual(possibleOperations);
    },
  );
});
