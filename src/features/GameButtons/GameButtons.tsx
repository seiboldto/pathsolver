import { IconArrowBack, IconHome, IconRefresh } from "@tabler/icons-react";
import { t } from "i18next";
import { useLocation } from "wouter";

import { Button, Group, Tooltip } from "~src/components";
import { useActiveLevel, useLevel } from "~src/hooks";
import { useLevelStore } from "~src/stores";

import classes from "./GameButtons.module.css";

export function GameButtons(): JSX.Element {
  const [, setLocation] = useLocation();
  const navigateToHome = () => setLocation("/");

  const { updatePersistedLevel } = useLevel();
  const { restartLevel, undoSelection } = useLevelStore.use.actions();
  const { gameState } = useActiveLevel();

  const handleRestart = () => {
    restartLevel();
    updatePersistedLevel();
  };

  const handleUndo = () => {
    undoSelection();
    updatePersistedLevel();
  };

  const disableRightButtons = gameState.state !== "playing";
  const disableHomeButton =
    gameState.state !== "playing" && gameState.state !== "waiting";

  return (
    <div className={classes.gameButtons}>
      <Tooltip label={t("game.exit")}>
        <Button square disabled={disableHomeButton} onClick={navigateToHome}>
          <IconHome />
        </Button>
      </Tooltip>

      <Group>
        <Tooltip label={t("game.restart")}>
          <Button square disabled={disableRightButtons} onClick={handleRestart}>
            <IconRefresh />
          </Button>
        </Tooltip>
        <Tooltip label={t("game.undo")}>
          <Button square disabled={disableRightButtons} onClick={handleUndo}>
            <IconArrowBack />
          </Button>
        </Tooltip>
      </Group>
    </div>
  );
}
