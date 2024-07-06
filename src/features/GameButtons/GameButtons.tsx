import { IconArrowBack, IconHome, IconRefresh } from "@tabler/icons-react";
import { t } from "i18next";
import { useLocation } from "wouter";

import { Button, Tooltip } from "~src/components";
import { useActiveLevel } from "~src/hooks";

import classes from "./GameButtons.module.css";

export function GameButtons(): JSX.Element {
  const [, setLocation] = useLocation();
  const navigateToHome = () => setLocation("/");

  const { restartLevel, getGameState } = useActiveLevel();

  const handleUndo = () => {
    // TODO: Implement undo
    alert("Not implemented yet");
  };

  const gameState = getGameState();
  const disableLevelButtons = gameState !== "playing";
  const disableHomeButton = gameState === "won";

  return (
    <div className={classes.gameButtons}>
      <Tooltip label={t("menu.back")}>
        <Button square disabled={disableHomeButton} onClick={navigateToHome}>
          <IconHome />
        </Button>
      </Tooltip>
      <div className={classes.levelControls}>
        <Tooltip label={t("game.restart")}>
          <Button square disabled={disableLevelButtons} onClick={restartLevel}>
            <IconRefresh />
          </Button>
        </Tooltip>
        <Tooltip label={t("game.undo")}>
          <Button square disabled={disableLevelButtons} onClick={handleUndo}>
            <IconArrowBack />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
