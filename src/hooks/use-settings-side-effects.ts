import { useEffect } from "react";

import { useSettingsStore } from "~src/stores";

export const useSettingsSideEffects = () => {
  const settings = useSettingsStore.use.settings();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--hover-anim-duration",
      settings.enableHoverAnimations ? "250ms" : "0ms"
    );
  }, [settings.enableHoverAnimations]);
};
