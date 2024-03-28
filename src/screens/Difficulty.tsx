import { IconArrowLeft, IconPlayerPlay } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Button, Divider, Screen, ToggleButton } from "~src/components";
import { PRESET_DIFFICULTIES } from "~src/levels";
import { useRouterStore } from "~src/stores";

export function Difficulty() {
  const { t } = useTranslation();

  const { navigate } = useRouterStore.use.actions();
  const navigateToHome = () => navigate({ location: "home" });

  return (
    <Screen>
      <h1>{t("difficulty.title")}</h1>
      {PRESET_DIFFICULTIES.map((d) => (
        <ToggleButton key={d} active={d === "normal"}>
          {t(`difficulty.${d}`)}
        </ToggleButton>
      ))}
      <Button icon={IconPlayerPlay}>{t("menu.play")}</Button>
      <Divider />
      <Button icon={IconArrowLeft} onClick={navigateToHome}>
        {t("menu.back")}
      </Button>
    </Screen>
  );
}
