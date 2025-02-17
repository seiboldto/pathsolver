import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useSettingsStore } from "~src/stores";

export const useSettingsSideEffects = () => {
  const settings = useSettingsStore.use.settings();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.toggleAttribute(
      "data-hover-animations",
      settings.enableHoverAnimations
    );
  }, [settings.enableHoverAnimations]);

  useEffect(() => {
    const oldTheme = [...document.body.classList.values()].find((t) =>
      t.startsWith("theme-")
    );
    if (oldTheme !== undefined) document.body.classList.remove(oldTheme);

    document.body.classList.add(`theme-${settings.theme}`);
  }, [settings.theme]);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
};
