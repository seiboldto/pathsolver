import { create } from "zustand";

import { createSelectors } from "./store-utils";

type Route = { location: "home" | "settings" };
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
