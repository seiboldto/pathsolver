import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  enableMenuTransitions: boolean;
};

// TODO: Create settings based on user preferences
const settingsStore = create(
  persist<SettingsStore, [], [], Pick<SettingsStore, "settings">>(
    (set, get) => ({
      settings: {
        theme: "light",
        enableHoverAnimations: true,
        enableMenuTransitions: true,
      },
      actions: {
        updateSettings: (key, value) =>
          set({ settings: { ...get().settings, [key]: value } }),
      },
    }),
    {
      name: "settings-store",
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);

export const useSettingsStore = createSelectors(settingsStore);
