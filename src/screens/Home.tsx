import {
  IconAdjustmentsHorizontal,
  IconPlayerPlay,
  IconSettings,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

import { Button, Divider, Screen, Title, ToggleInput } from "~src/components";
import { Difficulty, generateRandomLevel } from "~src/levels";
import { SELECTABLE_DIFFICULTIES } from "~src/models";
import { useLevelStore, useUiStore } from "~src/stores";

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

  const { setActiveLevel } = useLevelStore.use.actions();
  const handlePlayClick = () => {
    // TODO: Implement custom difficulties
    if (selectedDifficulty === "custom") return alert("Not implemented yet.");

    const difficulty = Difficulty[selectedDifficulty]();
    const level = generateRandomLevel(difficulty);

    setActiveLevel(level);
    setLocation("/level");
  };

  return (
    <Screen>
      <Title>{t("home.title")}</Title>
      <ToggleInput
        label={t("home.choose-difficulty")}
        data={difficulties}
        value={selectedDifficulty}
        onChange={(v) => selectDifficulty(v)}
        i18nPrefix="home.difficulty-"
      />

      <Button icon={IconPlayerPlay} onClick={handlePlayClick}>
        {t("home.play")}
      </Button>
      <Divider />
      <Button icon={IconSettings} onClick={navigateToSettings}>
        {t("home.settings")}
      </Button>
    </Screen>
  );
}
