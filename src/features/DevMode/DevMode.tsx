import { IconBulb, IconCode } from "@tabler/icons-react";
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

  const handlePrintObjectives = () => {
    if (!activeLevelState) return;

    const { objectives } = activeLevelState;

    print(
      ...objectives.flatMap((o) => [
        "Objective " + o.index,
        o.path.map((i) => i.row + ", " + i.column).join(" -> "),
      ])
    );
  };

  const disableLevelCheats = location !== "/level";

  return (
    <div className={classes.devMode}>
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
              onClick={handlePrintObjectives}
              disabled={disableLevelCheats}
            >
              <IconBulb />
            </Button>
          </Tooltip>
        </>
      )}
    </div>
  );
}
