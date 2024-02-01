import { writable } from "svelte/store";

type Settings = {
  hoverAnimations: boolean;
};

export const settingsStore = writable<Settings>({ hoverAnimations: true });

settingsStore.subscribe((settings) => {
  document.documentElement.style.setProperty(
    "--hover-anim-duration",
    settings.hoverAnimations ? "250ms" : "0s"
  );
});
