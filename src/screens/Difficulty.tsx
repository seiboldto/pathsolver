import {
  IconAdjustmentsHorizontal,
  IconArrowLeft,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Button, Divider, Screen, Title, ToggleInput } from "~src/components";
import { Difficulty, generateRandomLevel } from "~src/levels";
import { SELECTABLE_DIFFICULTIES } from "~src/models";
import { useRouterStore, useUiStore } from "~src/stores";

const difficulties = SELECTABLE_DIFFICULTIES.map((d) => ({
  value: d,
  label: d === "custom" ? <IconAdjustmentsHorizontal /> : undefined,
  square: d === "custom",
}));

export function DifficultyScreen() {
  const { t } = useTranslation();

  const { navigate } = useRouterStore.use.actions();
  const navigateToHome = () => navigate({ location: "home" });

  const selectedDifficulty = useUiStore.use.selectedDifficulty();
  const { selectDifficulty } = useUiStore.use.actions();

  const handlePlayClick = () => {
    // TODO: Implement custom difficulties
    if (selectedDifficulty === "custom") return alert("Not implemented yet.");

    const difficulty = Difficulty.presets[selectedDifficulty];
    const level = generateRandomLevel(difficulty);

    navigate({ location: "level", level });
  };

  return (
    <Screen>
      <Title>{t("difficulty.title")}</Title>
      <ToggleInput
        label={t("difficulty.choose")}
        data={difficulties}
        value={selectedDifficulty}
        onChange={(v) => selectDifficulty(v)}
        i18nPrefix="difficulty."
      />
      <Button icon={IconPlayerPlay} onClick={handlePlayClick}>
        {t("menu.play")}
      </Button>
      <Divider />
      <Button icon={IconArrowLeft} onClick={navigateToHome}>
        {t("menu.back")}
      </Button>
    </Screen>
  );
}
