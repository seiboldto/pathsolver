export { NORMAL_GAME } from "./normal-game.ts";

export type LevelFixture = {
  LEVEL: string;
  OBJECTIVES: number[];
  NODES: (number | null)[][];
  EDGES: (string | null)[][];
  SELECTION_COORDS: [number, number][][];
  PERFECT_SELECTION_COORDS?: [number, number][][];
};
