import { IconCalendar, IconCode } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Button, Tooltip } from "~src/components";
import { useBooleanState, useNavigation } from "~src/hooks";
import { useUiStore } from "~src/stores";

import classes from "./DevMode.module.css";
import { LevelCheats } from "./LevelCheats";
import { StreakInfo } from "./StreakInfo";

export function DevMode() {
  const { t } = useTranslation();
  const { isLocation } = useNavigation();

  const isDeveloperMode = useUiStore.use.isDeveloperMode();
  const { toggleDeveloperMode } = useUiStore.use.actions();

  const [isStreakInfoVisible, streakInfoHandler] = useBooleanState(false);

  const showLevelCheats = isLocation("LEVEL");

  return (
    <>
      <div className={classes.devBar}>
        <Tooltip label={t("features.dev-mode.title")}>
          <Button square onClick={toggleDeveloperMode}>
            <IconCode />
          </Button>
        </Tooltip>
        {isDeveloperMode && (
          <>
            {showLevelCheats && <LevelCheats />}
            <Tooltip label={t("features.dev-mode.toggle-streak-info")}>
              <Button square onClick={streakInfoHandler.toggle}>
                <IconCalendar />
              </Button>
            </Tooltip>
            {isStreakInfoVisible && <StreakInfo />}
          </>
        )}
      </div>
      {isDeveloperMode && <div className={classes.devIndicator} />}
    </>
  );
}
