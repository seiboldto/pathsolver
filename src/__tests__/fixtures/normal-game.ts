import { type LevelFixture } from ".";
import { NORMAL_LEVEL } from "./normal-level.ts";

export const NORMAL_GAME = {
  LEVEL: JSON.stringify(NORMAL_LEVEL),
  OBJECTIVES: [12, 5, -5],
  NODES: [
    [6, 4, 1, 6, 8, 4, 3, 4, 6],
    [null, null, null, 6, 4, null, 3, 4, 1],
    [null, null, null, 6, null, null, 3, 4, null],
  ],
  EDGES: [
    [
      "Addition",
      "Addition",
      "Subtraction",
      "Addition",
      "Subtraction",
      "Addition",
      "Addition",
      "Subtraction",
      "Subtraction",
      "Subtraction",
      "Subtraction",
      "Addition",
    ],
    [
      null,
      null,
      "Subtraction",
      null,
      "Subtraction",
      "Addition",
      null,
      null,
      null,
      "Subtraction",
      "Subtraction",
      null,
    ],
    [
      null,
      null,
      null,
      null,
      "Subtraction",
      null,
      null,
      null,
      null,
      "Subtraction",
      null,
      null,
    ],
  ],
  SELECTION_COORDS: [
    [
      [3, 3],
      [2, 3],
      [2, 2],
      [2, 1],
    ],
    [
      [3, 2],
      [3, 3],
    ],
    [
      [3, 2],
      [3, 1],
      [2, 1],
    ],
  ],
  PERFECT_SELECTION_COORDS: [
    [
      [2, 2],
      [2, 3],
    ],
    [
      [2, 2],
      [2, 3],
    ],
    [
      [3, 2],
      [3, 1],
      [2, 1],
    ],
  ],
} satisfies LevelFixture;
