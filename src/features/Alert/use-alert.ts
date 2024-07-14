import { useActiveLevel } from "~src/hooks";

export type Alert = {
  type: "warning";
  id: "lost";
};

export const useAlert = (): Alert | null => {
  const { getGameState } = useActiveLevel();

  if (getGameState() === "lost")
    return {
      type: "warning",
      id: "lost",
    };
  return null;
};
