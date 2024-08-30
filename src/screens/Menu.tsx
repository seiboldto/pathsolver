import { IconPlayerPlay, IconRepeat, IconSettings } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

import {
  Button,
  Divider,
  Group,
  Screen,
  Title,
  ToggleInput,
} from "~src/components";
import { DifficultyStats } from "~src/features";
import { useLevel } from "~src/hooks";
import { PRESET_DIFFICULTIES } from "~src/level-gen";
import { useUiStore } from "~src/stores";

const difficulties = PRESET_DIFFICULTIES.map((d) => ({
  value: d,
}));

export function MenuScreen() {
  const { t } = useTranslation();

  const [, setLocation] = useLocation();
  const navigateToSettings = () => setLocation("/settings");

  const selectedDifficulty = useUiStore.use.selectedDifficulty();
  const { selectDifficulty } = useUiStore.use.actions();

  const { persistedLevelDifficulty, playPersistedLevel, playRandomLevel } =
    useLevel();

  const handlePlayClick = () => {
    playRandomLevel(selectedDifficulty);
  };

  const handleResumeClick = () => {
    playPersistedLevel();
  };

  const showResumeButton = persistedLevelDifficulty === selectedDifficulty;

  return (
    <Screen>
      <Title>{t("title")}</Title>
      <ToggleInput
        label={t("menu.choose-difficulty")}
        data={difficulties}
        value={selectedDifficulty}
        onChange={(v) => selectDifficulty(v)}
        i18nPrefix="difficulty."
      />

      <DifficultyStats difficulty={selectedDifficulty} />
      <Group>
        <Button icon={IconPlayerPlay} onClick={handlePlayClick}>
          {t("menu.play")}
        </Button>
        {showResumeButton && (
          <Button icon={IconRepeat} onClick={handleResumeClick}>
            {t("menu.resume")}
          </Button>
        )}
      </Group>
      <Divider />
      <Button icon={IconSettings} onClick={navigateToSettings}>
        {t("navigation.settings")}
      </Button>
    </Screen>
  );
}
