import { writable } from "svelte/store";

type Settings = {
  menuTransitions: boolean;
};

export const settingsStore = writable<Settings>({ menuTransitions: true });
