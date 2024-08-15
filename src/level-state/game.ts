import { type Node } from "~src/models";

type GameState = {
  state: "waiting" | "playing" | "perfect-won" | "won";
  hasWon: boolean;
};

type GetGameState = {
  activeObjectiveIndex: number;
  objectivesCount: number;
  nodes: Node[];
};

export const getGameState = ({
  activeObjectiveIndex,
  objectivesCount,
  nodes,
}: GetGameState): GameState => {
  if (activeObjectiveIndex === 0) return { state: "waiting", hasWon: false };
  if (activeObjectiveIndex < objectivesCount)
    return { state: "playing", hasWon: false };

  if (nodes.some((n) => n.active))
    return { state: "perfect-won", hasWon: true };
  return { state: "won", hasWon: true };
};
