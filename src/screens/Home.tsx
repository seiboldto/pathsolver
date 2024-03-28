import {
  IconCalendarEvent,
  IconPlayerPlay,
  IconSettings,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Button, Screen } from "~src/components";
import { useRouterStore } from "~src/stores";

export function Home() {
  const { t } = useTranslation();

  const { navigate } = useRouterStore.use.actions();
  const navigateToSettings = () => navigate({ location: "settings" });

  return (
    <Screen>
      <h1>{t("menu.title")}</h1>
      <Button icon={IconPlayerPlay}>{t("menu.play")}</Button>
      <Button icon={IconCalendarEvent}>{t("menu.daily")}</Button>
      <Button icon={IconSettings} onClick={navigateToSettings}>
        {t("menu.settings")}
      </Button>
    </Screen>
  );
}
