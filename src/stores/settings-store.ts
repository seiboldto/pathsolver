import { create } from "zustand";
import { persist } from "zustand/middleware";

import { isDarkThemeDevice, isTouchDevice, VERSIONS } from "~src/lib";

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
  const theme = isDarkThemeDevice() ? "dark" : "light";
  const touchDevice = isTouchDevice();

  return {
    theme,
    enableHoverAnimations: !touchDevice,
    increasedNodeSize: touchDevice,
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
