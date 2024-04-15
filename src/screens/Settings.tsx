import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Button, Checkbox, Screen, Title, ToggleInput } from "~src/components";
import { SelectData } from "~src/models";
import { useRouterStore, useSettingsStore } from "~src/stores";

export function SettingsScreen() {
  const { t } = useTranslation();

  const { navigate } = useRouterStore.use.actions();
  const navigateToHome = () => navigate({ location: "home" });
  const settings = useSettingsStore.use.settings();
  const { updateSettings } = useSettingsStore.use.actions();

  const themes: SelectData<"light" | "dark"> = [
    { value: "light", label: t("settings.theme-light") },
    { value: "dark", label: t("settings.theme-dark") },
  ];

  return (
    <Screen>
      <Title>{t("settings.title")}</Title>
      <ToggleInput
        label={t("settings.theme")}
        data={themes}
        value={settings.theme}
        onChange={(value) => updateSettings("theme", value)}
      />
      <Checkbox
        label={t("settings.hover-animations")}
        checked={settings.enableHoverAnimations}
        onChange={(value) => updateSettings("enableHoverAnimations", value)}
      />
      <Button icon={IconArrowLeft} onClick={navigateToHome}>
        {t("menu.back")}
      </Button>
    </Screen>
  );
}
