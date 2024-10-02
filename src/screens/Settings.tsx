import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import {
  Button,
  Checkbox,
  Screen,
  Select,
  Title,
  ToggleInput,
} from "~src/components";
import { useNavigation } from "~src/hooks";
import { LANGUAGES } from "~src/lib";
import { type SelectData } from "~src/models";
import { useSettingsStore } from "~src/stores";

const languages: SelectData<(typeof LANGUAGES)[number]["locale"]> =
  LANGUAGES.map((l) => ({ label: l.name, value: l.locale }));

export function SettingsScreen() {
  const { t, i18n } = useTranslation();

  const { handleMenuNavigation } = useNavigation();

  const settings = useSettingsStore.use.settings();
  const { updateSettings } = useSettingsStore.use.actions();

  const themes: SelectData<"light" | "dark"> = [
    { value: "light", label: t("settings.theme-light") },
    { value: "dark", label: t("settings.theme-dark") },
  ];

  return (
    <Screen>
      <Title>{t("pages.settings")}</Title>
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
      />
      <Checkbox
        label={t("settings.hover-animations")}
        checked={settings.enableHoverAnimations}
        onChange={(value) => updateSettings("enableHoverAnimations", value)}
      />
      <Button icon={IconArrowLeft} onClick={handleMenuNavigation}>
        {t("buttons.back")}
      </Button>
    </Screen>
  );
}
