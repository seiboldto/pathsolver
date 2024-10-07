import { IconBulb, IconInfoSquare } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";
import { useStatisticsStore } from "~src/stores";

import classes from "./Alerts.module.css";

export function Alerts(): JSX.Element | null {
  const { t } = useTranslation();

  const { hint, activeObjectiveIndex, tutorialState } = useActiveLevel();

  const showHint = hint && activeObjectiveIndex <= hint.objectiveIndex;

  const stats = useStatisticsStore.use.stats();
  const showTutorial =
    stats.normal.gamesPlayed === 0 &&
    stats.hard.gamesPlayed === 0 &&
    stats.extreme.gamesPlayed === 0;

  return (
    <>
      {showHint && (
        <div className={classes.alert} role="status" data-position="bottom">
          <IconBulb className={classes.icon} />
          {t(`level.hints.hint`, {
            count: hint.objectiveIndex + 1,
            ordinal: true,
            length: hint.pathLength,
          })}
        </div>
      )}
      {showTutorial && (
        <div className={classes.alert} role="status" data-position="top">
          <IconInfoSquare className={classes.icon} />
          {t(
            `level.tutorial.${tutorialState.step.id}`,
            tutorialState.step.i18n
          )}
        </div>
      )}
    </>
  );
}
