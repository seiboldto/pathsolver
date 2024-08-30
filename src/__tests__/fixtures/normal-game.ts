import { type LevelFixture } from ".";
import normalLevel from "./normal-level.json" assert { type: "json" };

export const NORMAL_GAME = {
  LEVEL: JSON.stringify(normalLevel),
  OBJECTIVES: [10, 21, 6],
  NODES: [
    [6, 4, 7, 2, 4, 7, 9, 6, 6],
    [null, null, 7, 6, null, 7, 9, 6, 6],
    [null, null, 7, null, null, 7, null, null, 6],
  ],
  EDGES: [
    [
      "Addition",
      "Subtraction",
      "Addition",
      "Subtraction",
      "Addition",
      "Addition",
      "Subtraction",
      "Addition",
      "Subtraction",
      "Addition",
      "Addition",
      "Addition",
    ],
    [
      null,
      null,
      null,
      null,
      "Addition",
      "Addition",
      null,
      null,
      "Subtraction",
      "Addition",
      null,
      "Addition",
    ],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "Subtraction",
      null,
      null,
      "Addition",
    ],
  ],
  SELECTION_COORDS: [
    [
      [1, 2],
      [2, 2],
      [2, 1],
    ],
    [
      [2, 1],
      [3, 1],
      [3, 2],
    ],
    [
      [1, 3],
      [2, 3],
      [3, 3],
    ],
  ],
} satisfies LevelFixture;
