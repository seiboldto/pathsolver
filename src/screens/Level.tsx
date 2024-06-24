import { IconArrowBack, IconHome, IconRefresh } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation } from "wouter";

import { Button, Group, Screen, Tooltip } from "~src/components";
import { useLevelStore } from "~src/stores";

export function LevelScreen(): JSX.Element {
  const { t } = useTranslation();

  const [, setLocation] = useLocation();
  const navigateToHome = () => setLocation("/");

  const activeLevelState = useLevelStore.use.activeLevelState();
  if (activeLevelState === null) {
    return <Redirect to="/" />;
  }

  return (
    <Screen gap="xl">
      <Group>
        <Tooltip label={t("menu.back")}>
          <Button square onClick={navigateToHome}>
            <IconHome />
          </Button>
        </Tooltip>
        <Tooltip label={t("game.restart")}>
          <Button square>
            <IconRefresh />
          </Button>
        </Tooltip>
        <Tooltip label={t("game.undo")}>
          <Button square>
            <IconArrowBack />
          </Button>
        </Tooltip>
        {activeLevelState.level.paths.join(",")}
      </Group>
    </Screen>
  );
}
