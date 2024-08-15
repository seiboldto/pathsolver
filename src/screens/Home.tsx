import {
  IconAdjustmentsHorizontal,
  IconPlayerPlay,
  IconSettings,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

import { Button, Divider, Screen, Title, ToggleInput } from "~src/components";
import { DifficultyStats } from "~src/features";
import { useGenerateLevel } from "~src/hooks";
import { SELECTABLE_DIFFICULTIES } from "~src/models";
import { useUiStore } from "~src/stores";

const difficulties = SELECTABLE_DIFFICULTIES.map((d) => ({
  value: d,
  label: d === "custom" ? <IconAdjustmentsHorizontal /> : undefined,
  square: d === "custom",
}));

export function HomeScreen() {
  const { t } = useTranslation();

  const [, setLocation] = useLocation();
  const navigateToSettings = () => setLocation("/settings");

  const selectedDifficulty = useUiStore.use.selectedDifficulty();
  const { selectDifficulty } = useUiStore.use.actions();

  const { playRandomLevel } = useGenerateLevel();
  const handlePlayClick = () => {
    if (selectedDifficulty === "custom") return alert("Not implemented yet.");
    playRandomLevel(selectedDifficulty);
  };

  return (
    <Screen>
      <Title>{t("title")}</Title>
      <ToggleInput
        label={t("home.choose-difficulty")}
        data={difficulties}
        value={selectedDifficulty}
        onChange={(v) => selectDifficulty(v)}
        i18nPrefix="home.difficulty-"
      />
      {selectedDifficulty !== "custom" && (
        <DifficultyStats difficulty={selectedDifficulty} />
      )}
      <Button icon={IconPlayerPlay} onClick={handlePlayClick}>
        {t("home.play")}
      </Button>
      <Divider />
      <Button icon={IconSettings} onClick={navigateToSettings}>
        {t("navigation.settings")}
      </Button>
    </Screen>
  );
}
