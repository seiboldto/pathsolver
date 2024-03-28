import {
  IconAdjustmentsHorizontal,
  IconArrowLeft,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import {
  Button,
  Divider,
  Group,
  Screen,
  Title,
  ToggleButton,
} from "~src/components";
import {
  Difficulty,
  generateRandomLevel,
  PRESET_DIFFICULTIES,
} from "~src/levels";
import { useRouterStore, useUiStore } from "~src/stores";

export function DifficultyScreen() {
  const { t } = useTranslation();

  const { navigate } = useRouterStore.use.actions();
  const navigateToHome = () => navigate({ location: "home" });

  const selectedDifficulty = useUiStore.use.selectedDifficulty();
  const { selectPresetDifficulty, selectCustomDifficulty } =
    useUiStore.use.actions();

  const handlePlayClick = () => {
    // TODO: Implement custom difficulties
    if (selectedDifficulty.type === "custom")
      return alert("Not implemented yet.");

    const selectedDifficultyPreset = selectedDifficulty.difficulty;
    const difficulty = Difficulty.presets[selectedDifficultyPreset];
    const level = generateRandomLevel(difficulty);

    navigate({ location: "level", level });
  };

  return (
    <Screen>
      <Title>{t("difficulty.title")}</Title>
      <Group>
        {PRESET_DIFFICULTIES.map((d) => (
          <ToggleButton
            key={d}
            active={
              selectedDifficulty.type === "preset" &&
              selectedDifficulty.difficulty === d
            }
            onClick={() => selectPresetDifficulty(d)}
          >
            {t(`difficulty.${d}`)}
          </ToggleButton>
        ))}
        <ToggleButton
          square
          active={selectedDifficulty.type === "custom"}
          onClick={() => selectCustomDifficulty()}
        >
          <IconAdjustmentsHorizontal />
        </ToggleButton>
      </Group>
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
