import { type Level } from "~src/levels";
import { useRouterStore } from "~src/stores";

export const useLevel = (): Level => {
  const route = useRouterStore.use.route();

  if (route.location !== "level")
    throw new Error("use-level hook may only be used on the level screen.");
  return route.level;
};
