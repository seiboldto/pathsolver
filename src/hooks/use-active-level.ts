import { useLevelStore } from "~src/stores";

export const useActiveLevel = () => {
  const activeLevelState = useLevelStore.use.activeLevelState();
  if (activeLevelState === null)
    throw new Error("useActiveLevel may only be used on the `Level` screen.");
  const { level } = activeLevelState;

  return { level };
};
