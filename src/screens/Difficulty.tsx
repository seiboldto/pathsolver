import {
  IconArrowLeft,
  IconPlayerPlay,
  IconSettings,
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
import { PRESET_DIFFICULTIES } from "~src/levels";
import { useRouterStore, useUiStore } from "~src/stores";

export function Difficulty() {
  const { t } = useTranslation();

  const { navigate } = useRouterStore.use.actions();
  const navigateToHome = () => navigate({ location: "home" });

  const selectedDifficulty = useUiStore.use.selectedDifficulty();
  const { selectPresetDifficulty, selectCustomDifficulty } =
    useUiStore.use.actions();

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
          <IconSettings />
        </ToggleButton>
      </Group>
      <Button icon={IconPlayerPlay}>{t("menu.play")}</Button>
      <Divider />
      <Button icon={IconArrowLeft} onClick={navigateToHome}>
        {t("menu.back")}
      </Button>
    </Screen>
  );
}
