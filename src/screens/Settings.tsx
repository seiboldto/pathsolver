import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Button, Screen, Title, ToggleInput } from "~src/components";
import { SelectData } from "~src/models";
import { useRouterStore, useSettingsStore } from "~src/stores";

export function SettingsScreen() {
  const { t } = useTranslation();

  const { navigate } = useRouterStore.use.actions();
  const navigateToHome = () => navigate({ location: "home" });
  const { theme } = useSettingsStore.use.settings();
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
        value={theme}
        onChange={(value) => updateSettings("theme", value)}
      />
      <Button icon={IconArrowLeft} onClick={navigateToHome}>
        {t("menu.back")}
      </Button>
    </Screen>
  );
}
