import { create } from "zustand";
import { persist } from "zustand/middleware";

import { isMobileDevice, VERSIONS } from "~src/lib";

import { createSelectors } from "./store-utils";

type SettingsStore = {
  settings: Settings;
  actions: {
    updateSettings: <T extends keyof Settings>(
      key: T,
      value: Settings[T]
    ) => void;
  };
};

type Settings = {
  theme: "light" | "dark";
  enableHoverAnimations: boolean;
  increasedNodeSize: boolean;
};

const getDefaultSettings = (): Settings => {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  return {
    theme,
    enableHoverAnimations: !isMobileDevice(),
    increasedNodeSize: isMobileDevice(),
  };
};

const settingsStore = create(
  persist<SettingsStore, [], [], Pick<SettingsStore, "settings">>(
    (set, get) => ({
      settings: getDefaultSettings(),
      actions: {
        updateSettings: (key, value) =>
          set({ settings: { ...get().settings, [key]: value } }),
      },
    }),
    {
      name: "settings-store",
      partialize: (state) => ({ settings: state.settings }),
      version: VERSIONS.STORAGE.SETTINGS,
    }
  )
);

export const useSettingsStore = createSelectors(settingsStore);
