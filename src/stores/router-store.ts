import { writable } from "svelte/store";

type Route = {
  route: "home" | "settings" | "play";
};

export const router = writable<Route>({ route: "home" });
export const navigate = (route: Route): void => {
  router.set(route);
};
