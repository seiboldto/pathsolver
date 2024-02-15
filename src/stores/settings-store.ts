import { writable } from "svelte/store";

type Settings = {
  menuTransitions: boolean;
  hoverAnimations: boolean;
};

export const settingsStore = writable<Settings>({
  menuTransitions: true,
  hoverAnimations: true,
});

settingsStore.subscribe((store) => {
  document.documentElement.style.setProperty(
    "--menu-transition-duration",
    store.menuTransitions ? "300ms" : "0ms",
  );
});
