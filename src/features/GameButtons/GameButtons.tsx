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
import { ShareLevel } from "~src/features";
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
  const { restartLevel, undoSelection } = useLevelStore.use.actions();
  const { gameState, seed, difficultyOptions } = useActiveLevel();

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
        <Tooltip label={t("share.title")}>
          <Button
            square
            disabled={disableMenuButton}
            onClick={shareOverlayHandler.show}
          >
            <IconShare />
          </Button>
        </Tooltip>
        <Tooltip label={t("hints.title")}>
          <Button
            square
            disabled={disableMenuButton}
            onClick={hintsOverlayHander.show}
          >
            <IconBulb />
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

      <Overlay visible={isShareOverlayOpen} title={t("share.title")}>
        <ShareLevel seed={seed} difficultyPreset={difficultyOptions.preset} />
        <Divider />
        <Button onClick={shareOverlayHandler.hide} icon={IconX}>
          {t("navigation.close")}
        </Button>
      </Overlay>

      <Overlay visible={isHintsOverlayOpen} title={t("hints.title")}>
        <Text>{t("hints.warning")}</Text>
        <Button onClick={hintsOverlayHander.hide} icon={IconBulb}>
          {t("hints.title")}
        </Button>
        <Button onClick={hintsOverlayHander.hide} icon={IconX}>
          {t("navigation.close")}
        </Button>
      </Overlay>
    </div>
  );
}
