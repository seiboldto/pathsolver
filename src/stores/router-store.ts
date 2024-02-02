import { writable } from "svelte/store";

import { type LevelType } from "~models/level";

type Router =
  | {
      route: "home" | "settings" | "play";
    }
  | {
      route: "loader";
      level: LevelType;
    };

export const router = writable<Router>({ route: "home" });
export const navigate = (route: Router): void => {
  router.set(route);
};
