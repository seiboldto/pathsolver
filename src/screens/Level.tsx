import { IconArrowBack, IconHome, IconRefresh } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation } from "wouter";

import { Button, Group, Screen, Tooltip } from "~src/components";
import { GameBoard, GameInfo } from "~src/features";
import { useLevelStore } from "~src/stores";

export function LevelScreen(): JSX.Element {
  const { t } = useTranslation();

  const [, setLocation] = useLocation();
  const navigateToHome = () => setLocation("/");

  const activeLevelState = useLevelStore.use.activeLevelState();
  const { setActiveLevel } = useLevelStore.use.actions();
  if (activeLevelState === null) {
    return <Redirect to="/" replace />;
  }

  const handleRestart = () => setActiveLevel(activeLevelState.level);
  const handleUndo = () => console.log("hey");

  return (
    <Screen gap="xl">
      <Group>
        <Tooltip label={t("menu.back")}>
          <Button square onClick={navigateToHome}>
            <IconHome />
          </Button>
        </Tooltip>
        <Tooltip label={t("game.restart")}>
          <Button square onClick={handleRestart}>
            <IconRefresh />
          </Button>
        </Tooltip>
        <Tooltip label={t("game.undo")}>
          <Button square disabled onClick={handleUndo}>
            <IconArrowBack />
          </Button>
        </Tooltip>
      </Group>
      <GameBoard />
      <GameInfo />
    </Screen>
  );
}
