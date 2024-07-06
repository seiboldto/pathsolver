import {
  IconArrowBack,
  IconBulb,
  IconHome,
  IconRefresh,
} from "@tabler/icons-react";
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

  const handleHint = () => {
    // TODO: Implement hint
    alert("Not implemented yet");
  };

  const gameState = getGameState();
  const disableRightButtons = gameState !== "playing";
  const disableLeftButtons = gameState === "won";

  return (
    <div className={classes.gameButtons}>
      <div>
        <Tooltip label={t("game.exit")}>
          <Button square disabled={disableLeftButtons} onClick={navigateToHome}>
            <IconHome />
          </Button>
        </Tooltip>
        <Tooltip label={t("game.hint")}>
          <Button square disabled={disableLeftButtons} onClick={handleHint}>
            <IconBulb />
          </Button>
        </Tooltip>
      </div>
      <div className={classes.levelControls}>
        <Tooltip label={t("game.restart")}>
          <Button square disabled={disableRightButtons} onClick={restartLevel}>
            <IconRefresh />
          </Button>
        </Tooltip>
        <Tooltip label={t("game.undo")}>
          <Button square disabled={disableRightButtons} onClick={handleUndo}>
            <IconArrowBack />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
