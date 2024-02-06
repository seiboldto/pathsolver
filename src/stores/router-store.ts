import { writable } from "svelte/store";

type Router = {
  route: "home";
};

export const router = writable<Router>({ route: "home" });
export const navigate = (route: Router): void => {
  router.set(route);
};
