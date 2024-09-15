import { IconInfoSquare } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";
import { useStatisticsStore } from "~src/stores";

import classes from "./Tutorial.module.css";

export function Tutorial(): JSX.Element | null {
  const { t } = useTranslation();

  const { tutorialState } = useActiveLevel();

  const stats = useStatisticsStore.use.stats();
  const showTutorial =
    stats.normal.gamesPlayed === 0 &&
    stats.hard.gamesPlayed === 0 &&
    stats.extreme.gamesPlayed === 0;

  if (!showTutorial) return null;

  return (
    <div className={classes.tutorial} role="status">
      <IconInfoSquare className={classes.icon} />
      {t(`game.tutorial.${tutorialState.step.id}`, tutorialState.step.i18n)}
    </div>
  );
}
