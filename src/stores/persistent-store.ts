import { writable } from "svelte/store";

import { type PresetDifficulty } from "~src/levels";

type PersistentStore = {
  settings: Settings;
  ui: UiState;
};

type Settings = {
  menuTransitions: boolean;
  hoverAnimations: boolean;
};

type UiState = {
  selectedDifficulty: PresetDifficulty;
};

export const persistentStore = writable<PersistentStore>({
  settings: {
    menuTransitions: true,
    hoverAnimations: true,
  },
  ui: { selectedDifficulty: "normal" },
});

persistentStore.subscribe((store) => {
  document.documentElement.style.setProperty(
    "--menu-transition-duration",
    store.settings.menuTransitions ? "300ms" : "0ms",
  );

  document.documentElement.style.setProperty(
    "--hover-anim-duration",
    store.settings.hoverAnimations ? "250ms" : "0ms",
  );
});
