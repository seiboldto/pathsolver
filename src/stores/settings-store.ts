import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createSelectors } from "./store-utils";

type SettingsStore = {
  settings: Settings;
};

type Settings = {
  enableHoverAnimations: boolean;
};

const settingsStore = create(
  persist<SettingsStore>(
    () => ({
      settings: { enableHoverAnimations: true },
    }),
    { name: "settings-store" }
  )
);

export const useSettingsStore = createSelectors(settingsStore);
