import {
  IconInfoSmall,
  IconPlayerPlay,
  IconRepeat,
  IconSettings,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import {
  Button,
  Divider,
  Group,
  Overlay,
  Screen,
  Title,
  ToggleInput,
  Tooltip,
} from "~src/components";
import { DifficultyStats, OverwriteLevel } from "~src/features";
import { useBooleanState, useLevel, useNavigation } from "~src/hooks";
import { PRESET_DIFFICULTIES } from "~src/level-gen";
import { useUiStore } from "~src/stores";

export function MenuScreen() {
  const { t } = useTranslation();

  const [showOverwriteOverlay, overwriteOverlayHandler] =
    useBooleanState(false);

  const { handleAboutNavigation, handleSettingsNavigation } = useNavigation();

  const selectedDifficulty = useUiStore.use.selectedDifficulty();
  const { selectDifficulty } = useUiStore.use.actions();

  const { persistedLevelDifficulty, playPersistedLevel, playRandomLevel } =
    useLevel();

  const handlePlayClick = () => {
    if (persistedLevelDifficulty !== null) {
      overwriteOverlayHandler.show();
    } else {
      handleNewGame();
    }
  };

  const handleNewGame = () => {
    playRandomLevel(selectedDifficulty);
  };

  const handleResumeClick = () => {
    playPersistedLevel();
  };

  const difficulties = PRESET_DIFFICULTIES.map((d) => ({
    value: d,
    label: t(`difficulty.${d}`),
  }));

  const showResumeButton = persistedLevelDifficulty !== null;

  return (
    <Screen>
      <Title>{t("title")}</Title>
      <ToggleInput
        label={t("menu.choose-difficulty")}
        data={difficulties}
        value={selectedDifficulty}
        onChange={(v) => selectDifficulty(v)}
      />

      <DifficultyStats difficulty={selectedDifficulty} />
      <Button icon={IconPlayerPlay} onClick={handlePlayClick}>
        {t("menu.play")}
      </Button>
      {showResumeButton && (
        <Button icon={IconRepeat} onClick={handleResumeClick}>
          {t("menu.resume")}
        </Button>
      )}
      <Divider />
      <Group>
        <Button icon={IconSettings} onClick={handleSettingsNavigation}>
          {t("navigation.settings")}
        </Button>
        <Tooltip label={t("navigation.about")}>
          <Button square onClick={handleAboutNavigation}>
            <IconInfoSmall size={30} />
          </Button>
        </Tooltip>
      </Group>
      <Overlay visible={showOverwriteOverlay} title="">
        <OverwriteLevel
          onCancel={overwriteOverlayHandler.hide}
          onOverwrite={handleNewGame}
        />
      </Overlay>
    </Screen>
  );
}
