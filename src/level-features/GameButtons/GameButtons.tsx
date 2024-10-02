import {
  IconArrowBack,
  IconBulb,
  IconHome,
  IconRefresh,
  IconShare,
  IconX,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import {
  Button,
  Divider,
  Group,
  Overlay,
  Text,
  Tooltip,
} from "~src/components";
import { ShareLevel } from "~src/level-features";
import {
  useActiveLevel,
  useBooleanState,
  useLevel,
  useNavigation,
} from "~src/hooks";
import { useLevelStore } from "~src/stores";

import classes from "./GameButtons.module.css";

export function GameButtons(): JSX.Element {
  const { t } = useTranslation();

  const { handleMenuNavigation } = useNavigation();

  const { updatePersistedLevel } = useLevel();
  const { restartLevel, undoSelection, createHint } =
    useLevelStore.use.actions();
  const { hint, gameState, seed, difficultyOptions } = useActiveLevel();

  const [isShareOverlayOpen, shareOverlayHandler] = useBooleanState(false);
  const [isHintsOverlayOpen, hintsOverlayHander] = useBooleanState(false);

  const handleRestart = () => {
    restartLevel();
    updatePersistedLevel();
  };

  const handleUndo = () => {
    undoSelection();
    updatePersistedLevel();
  };

  const handleHint = () => {
    createHint();
    updatePersistedLevel();
    hintsOverlayHander.hide();
  };

  const disableRightButtons = gameState.state !== "playing";
  const disableMenuButton = gameState.hasWon;

  return (
    <div className={classes.gameButtons}>
      <Group>
        <Tooltip label={t("pages.menu")}>
          <Button
            square
            disabled={disableMenuButton}
            onClick={handleMenuNavigation}
          >
            <IconHome />
          </Button>
        </Tooltip>
        <Tooltip label={t("level.share.title")}>
          <Button
            square
            disabled={disableMenuButton}
            onClick={shareOverlayHandler.show}
          >
            <IconShare />
          </Button>
        </Tooltip>
        {!hint && (
          <Tooltip label={t("level.hints.title")}>
            <Button
              square
              disabled={disableMenuButton}
              onClick={hintsOverlayHander.show}
            >
              <IconBulb />
            </Button>
          </Tooltip>
        )}
      </Group>

      <Group>
        <Tooltip label={t("level.buttons.restart")}>
          <Button square disabled={disableRightButtons} onClick={handleRestart}>
            <IconRefresh />
          </Button>
        </Tooltip>
        <Tooltip label={t("level.buttons.undo")}>
          <Button square disabled={disableRightButtons} onClick={handleUndo}>
            <IconArrowBack />
          </Button>
        </Tooltip>
      </Group>

      <Overlay visible={isShareOverlayOpen} title={t("level.share.title")}>
        <ShareLevel seed={seed} difficultyPreset={difficultyOptions.preset} />
        <Divider />
        <Button onClick={shareOverlayHandler.hide} icon={IconX}>
          {t("buttons.close")}
        </Button>
      </Overlay>

      <Overlay visible={isHintsOverlayOpen} title={t("level.hints.title")}>
        <Text>{t("level.hints.statistics-warning")}</Text>
        <Button onClick={handleHint} icon={IconBulb}>
          {t("level.hints.button")}
        </Button>
        <Divider />
        <Button onClick={hintsOverlayHander.hide} icon={IconX}>
          {t("buttons.close")}
        </Button>
      </Overlay>
    </div>
  );
}
