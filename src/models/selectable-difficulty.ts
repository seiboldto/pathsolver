import { type PresetDifficulty } from "~src/levels";

export type SelectableDifficulty = PresetDifficulty | "custom";
export const SELECTABLE_DIFFICULTIES = [
  "normal",
  "hard",
  "extreme",
  "custom",
] as const satisfies SelectableDifficulty[];
