import { create } from "zustand";

import { type Level } from "~src/levels";

import { createSelectors } from "./store-utils";

type Route =
  | { location: "home" | "settings" | "difficulty" }
  | { location: "level"; level: Level };

type RouterStore = {
  route: Route;
  actions: {
    navigate: (route: Route) => void;
  };
};

const routerStore = create<RouterStore>((set) => ({
  route: { location: "home" },
  actions: {
    navigate: (route) => set({ route }),
  },
}));

export const useRouterStore = createSelectors(routerStore);
