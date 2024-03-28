import {
  IconCalendarEvent,
  IconPlayerPlay,
  IconSettings,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Button, Screen } from "~src/components";

export function Home() {
  const { t } = useTranslation();

  return (
    <Screen>
      <h1>{t("menu.title")}</h1>
      <Button icon={IconPlayerPlay}>{t("menu.play")}</Button>
      <Button icon={IconCalendarEvent}>{t("menu.daily")}</Button>
      <Button icon={IconSettings}>{t("menu.settings")}</Button>
    </Screen>
  );
}
