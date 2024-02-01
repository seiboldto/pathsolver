import { writable } from "svelte/store";

import { type LevelType } from "~models/level";

type Router =
  | {
      route: "home" | "settings";
    }
  | {
      route: "loader";
      level: LevelType;
    };

export const routerStore = writable<Router>({ route: "home" });
