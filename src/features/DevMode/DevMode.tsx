import { IconArrowRight, IconBulb, IconCode } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

import { Button, Tooltip } from "~src/components";
import { useLevelStore, useUiStore } from "~src/stores";

import classes from "./DevMode.module.css";

const print = (...message: string[]) => {
  console.log(message.join("\n"));
};

export function DevMode() {
  const { t } = useTranslation();
  const [location] = useLocation();

  const isDeveloperMode = useUiStore.use.isDeveloperMode();
  const { toggleDeveloperMode } = useUiStore.use.actions();

  const activeLevelState = useLevelStore.use.activeLevelState();
  const { setActiveLevelState } = useLevelStore.use.actions();

  const printObjectives = () => {
    if (!activeLevelState) return;

    const { objectives } = activeLevelState;

    print(
      ...objectives.flatMap((o) => [
        "Objective " + o.index,
        o.path.map((i) => i.row + ", " + i.column).join(" -> "),
      ])
    );
  };

  const advanceObjectives = () => {
    setActiveLevelState((prev) => ({
      activeObjectiveIndex: prev.activeObjectiveIndex + 1,
    }));
  };

  const disableLevelCheats = location !== "/level";

  return (
    <>
      <div className={classes.devBar}>
        <Tooltip label={t("dev-mode.title")}>
          <Button square onClick={toggleDeveloperMode}>
            <IconCode />
          </Button>
        </Tooltip>
        {isDeveloperMode && (
          <>
            <Tooltip label={t("dev-mode.print-objectives")}>
              <Button
                square
                onClick={printObjectives}
                disabled={disableLevelCheats}
              >
                <IconBulb />
              </Button>
            </Tooltip>
            <Tooltip label={t("dev-mode.advance-objectives")}>
              <Button
                square
                onClick={advanceObjectives}
                disabled={disableLevelCheats}
              >
                <IconArrowRight />
              </Button>
            </Tooltip>
          </>
        )}
      </div>
      {isDeveloperMode && <div className={classes.devIndicator} />}
    </>
  );
}
