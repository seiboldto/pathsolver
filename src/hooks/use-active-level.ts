import { useLevelStore } from "~src/stores";

export const useActiveLevel = () => {
  const activeLevelState = useLevelStore.use.activeLevelState();
  if (activeLevelState === null)
    throw new Error("useActiveLevel may only be used on the `Level` screen.");
  const { nodes, level, edges } = activeLevelState;
  const { boardSize } = level.board.difficulty.options;

  return { nodes, edges, boardSize };
};
