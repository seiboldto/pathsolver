import { type Operation } from "./level";

export const DIFFICULTIY_IDS = ["normal", "hard", "extreme"] as const;
export type DifficultyId = (typeof DIFFICULTIY_IDS)[number];

export type Difficulty = {
  id: DifficultyId;
  size: number;
  operations: Operation[];
};

export const DIFFICULTIES: Difficulty[] = [
  { id: "normal", size: 3, operations: ["add", "subtract"] },
  { id: "hard", size: 3, operations: ["add", "subtract", "multiply"] },
  {
    id: "extreme",
    size: 4,
    operations: ["add", "subtract", "multiply", "divide"],
  },
];
