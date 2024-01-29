import { writable } from "svelte/store";

type Router = {
  route: "home" | "settings";
};

export const routerStore = writable<Router>({ route: "home" });
