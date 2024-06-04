import {
  IconCalendarEvent,
  IconPlayerPlay,
  IconSettings,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

import { Button, Screen, Title } from "~src/components";

export function HomeScreen() {
  const { t } = useTranslation();

  const [, setLocation] = useLocation();
  const navigateToSettings = () => setLocation("/settings");
  const navigateToDifficulty = () => setLocation("/difficulty");

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
