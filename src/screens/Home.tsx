import {
  IconCalendarEvent,
  IconPlayerPlay,
  IconSettings,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Button, Screen, Title } from "~src/components";
import { useRouterStore } from "~src/stores";

export function Home() {
  const { t } = useTranslation();

  const { navigate } = useRouterStore.use.actions();
  const navigateToSettings = () => navigate({ location: "settings" });
  const navigateToDifficulty = () => navigate({ location: "difficulty" });

  return (
    <Screen>
      <Title>{t("menu.title")}</Title>
      <Button icon={IconPlayerPlay} onClick={navigateToDifficulty}>
        {t("menu.play")}
      </Button>
      <Button icon={IconCalendarEvent}>{t("menu.daily")}</Button>
      <Button icon={IconSettings} onClick={navigateToSettings}>
        {t("menu.settings")}
      </Button>
    </Screen>
  );
}
