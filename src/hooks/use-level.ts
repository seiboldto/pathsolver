import { useRef } from "react";

import { type Level } from "~src/levels";
import { useRouterStore } from "~src/stores";

export const useLevel = (): Level => {
  const route = useRouterStore.use.route();
  const cachedLevel = useRef<Level | null>(null);

  if (route.location !== "level")
    if (cachedLevel.current !== null) return cachedLevel.current;
    else
      throw new Error("use-level hook may only be used on the level screen.");

  if (cachedLevel.current === null) {
    cachedLevel.current = route.level;
  }

  return cachedLevel.current;
};
