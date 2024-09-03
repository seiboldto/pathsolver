import {
  IconArrowBack,
  IconHome,
  IconRefresh,
  IconShare,
  IconX,
} from "@tabler/icons-react";
import { t } from "i18next";
import { useLocation } from "wouter";

import { Button, Divider, Group, Overlay, Tooltip } from "~src/components";
import { ShareLevel } from "~src/features";
import { useActiveLevel, useBooleanState, useLevel } from "~src/hooks";
import { useLevelStore } from "~src/stores";

import classes from "./GameButtons.module.css";

export function GameButtons(): JSX.Element {
  const [, setLocation] = useLocation();
  const handleMenuNavigation = () => setLocation("/");

  const { updatePersistedLevel } = useLevel();
  const { restartLevel, undoSelection } = useLevelStore.use.actions();
  const { gameState, seed, difficultyOptions } = useActiveLevel();

  const [isShareOverlayOpen, shareOverlayHandler] = useBooleanState(false);

  const handleRestart = () => {
    restartLevel();
    updatePersistedLevel();
  };

  const handleUndo = () => {
    undoSelection();
    updatePersistedLevel();
  };

  const disableRightButtons = gameState.state !== "playing";
  const disableMenuButton = gameState.hasWon;

  return (
    <div className={classes.gameButtons}>
      <Group>
        <Tooltip label={t("navigation.menu")}>
          <Button
            square
            disabled={disableMenuButton}
            onClick={handleMenuNavigation}
          >
            <IconHome />
          </Button>
        </Tooltip>
        <Tooltip label={t("game.share-level")}>
          <Button
            square
            disabled={disableMenuButton}
            onClick={shareOverlayHandler.show}
          >
            <IconShare />
          </Button>
        </Tooltip>
      </Group>

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

      <Overlay visible={isShareOverlayOpen} title={t("game.share-level")}>
        <ShareLevel seed={seed} difficultyPreset={difficultyOptions.preset} />
        <Divider />
        <Button onClick={shareOverlayHandler.hide} icon={IconX}>
          {t("navigation.close")}
        </Button>
      </Overlay>
    </div>
  );
}
