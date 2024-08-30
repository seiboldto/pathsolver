import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

import {
  Button,
  Checkbox,
  Screen,
  Select,
  Title,
  ToggleInput,
} from "~src/components";
import { LANGUAGES } from "~src/lib";
import { type SelectData } from "~src/models";
import { useSettingsStore } from "~src/stores";

const languages: SelectData<(typeof LANGUAGES)[number]["locale"]> =
  LANGUAGES.map((l) => ({ label: l.name, value: l.locale }));
const themes: SelectData<"light" | "dark"> = [
  { value: "light" },
  { value: "dark" },
];

export function SettingsScreen() {
  const { t, i18n } = useTranslation();

  const [, setLocation] = useLocation();
  const handleMenuNavigation = () => setLocation("/");

  const settings = useSettingsStore.use.settings();
  const { updateSettings } = useSettingsStore.use.actions();

  return (
    <Screen>
      <Title>{t("navigation.settings")}</Title>
      <Select
        label={t("settings.language")}
        data={languages}
        value={i18n.language}
        onChange={(value) => i18n.changeLanguage(value)}
      />
      <ToggleInput
        label={t("settings.theme")}
        data={themes}
        value={settings.theme}
        onChange={(value) => updateSettings("theme", value)}
        i18nPrefix="settings.theme-"
      />
      <Checkbox
        label={t("settings.hover-animations")}
        checked={settings.enableHoverAnimations}
        onChange={(value) => updateSettings("enableHoverAnimations", value)}
      />
      <Checkbox
        label={t("settings.menu-transitions")}
        checked={settings.enableMenuTransitions}
        onChange={(value) => updateSettings("enableMenuTransitions", value)}
      />
      <Button icon={IconArrowLeft} onClick={handleMenuNavigation}>
        {t("navigation.back")}
      </Button>
    </Screen>
  );
}
