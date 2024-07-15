import {
  IconBulb,
  IconCode,
  IconDownload,
  IconFocus2,
  IconUpload,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

import { Button, Tooltip } from "~src/components";
import {
  Difficulty,
  generateLevelFromSeed,
  PRESET_DIFFICULTIES,
} from "~src/levels";
import { useLevelStore, useUiStore } from "~src/stores";

import classes from "./DevMode.module.css";

const print = (...message: unknown[]) => {
  console.log(message.join("\n"));
};

export function DevMode() {
  const { t } = useTranslation();
  const [location] = useLocation();

  const isDeveloperMode = useUiStore.use.isDeveloperMode();
  const { toggleDeveloperMode } = useUiStore.use.actions();

  const activeLevelState = useLevelStore.use.activeLevelState();
  const { setActiveLevelState, setActiveLevel } = useLevelStore.use.actions();

  const [, setLocation] = useLocation();

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

  const printLevelSeed = () => {
    if (!activeLevelState) return;
    print("Seed", activeLevelState.level.seed);
  };

  const loadLevel = () => {
    const difficulty = prompt(t("dev-mode.enter-difficulty"));
    const selectedDifficulty = PRESET_DIFFICULTIES.find(
      (p) => p.toLowerCase() === difficulty?.toLowerCase()
    );
    if (!selectedDifficulty) return;

    const seed = prompt(t("dev-mode.enter-seed")) ?? "";
    const selectedSeed = parseInt(seed);
    if (isNaN(selectedSeed)) return;

    const level = generateLevelFromSeed(
      selectedSeed,
      Difficulty[selectedDifficulty]()
    );

    setActiveLevel(level);
    setLocation("/level");
  };

  const disableLevelCheats = location !== "/level";
  const disableMenuCheats = location === "/level";

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
                <IconFocus2 />
              </Button>
            </Tooltip>
            <Tooltip label={t("dev-mode.print-level-seed")}>
              <Button
                square
                onClick={printLevelSeed}
                disabled={disableLevelCheats}
              >
                <IconDownload />
              </Button>
            </Tooltip>
            <Tooltip label={t("dev-mode.load-level")}>
              <Button square onClick={loadLevel} disabled={disableMenuCheats}>
                <IconUpload />
              </Button>
            </Tooltip>
          </>
        )}
      </div>
      {isDeveloperMode && <div className={classes.devIndicator} />}
    </>
  );
}
