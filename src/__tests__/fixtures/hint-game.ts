import { type LevelFixture } from ".";
import { HINT_LEVEL } from "./hint-level";

export const HINT_GAME = {
  LEVEL: JSON.stringify(HINT_LEVEL),
  OBJECTIVES: [],
  NODES: [],
  EDGES: [],
  SELECTION_COORDS: [
    [
      [1, 3],
      [2, 3],
      [3, 3],
    ],
    [
      [2, 2],
      [2, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [3, 2],
      [3, 1],
    ],
  ],
  PERFECT_SELECTION_COORDS: [],
} satisfies LevelFixture;
