import { writable } from "svelte/store";

import { type Level } from "~src/levels";

type Route =
  | {
      route: "home" | "settings" | "play";
    }
  | { route: "level"; level: Level };

export const router = writable<Route>({ route: "home" });
export const navigate = (route: Route): void => {
  router.set(route);
};
