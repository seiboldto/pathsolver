import { IconArrowBack, IconHome, IconRefresh } from "@tabler/icons-react";
import { t } from "i18next";
import { useLocation } from "wouter";

import { Button, Tooltip } from "~src/components";
import { useActiveLevel } from "~src/hooks";

import classes from "./GameButtons.module.css";

export function GameButtons(): JSX.Element {
  const [, setLocation] = useLocation();
  const navigateToHome = () => setLocation("/");

  const { restartLevel, getLevelControlsState } = useActiveLevel();

  const handleUndo = () => {
    // TODO: Implement undo
    alert("Not implemented yet");
  };

  const disabled = getLevelControlsState() === "disabled";

  return (
    <div className={classes.gameButtons}>
      <Tooltip label={t("menu.back")}>
        <Button square onClick={navigateToHome}>
          <IconHome />
        </Button>
      </Tooltip>
      <div className={classes.levelControls}>
        <Tooltip label={t("game.restart")}>
          <Button square disabled={disabled} onClick={restartLevel}>
            <IconRefresh />
          </Button>
        </Tooltip>
        <Tooltip label={t("game.undo")}>
          <Button square disabled={disabled} onClick={handleUndo}>
            <IconArrowBack />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
