import { IconInfoSquare } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";
import { Objective } from "~src/models";
import { useStatisticsStore } from "~src/stores";

import classes from "./Tutorial.module.css";

type TutorialStepArgs = {
  selectionLength: number;
  selectionValue: number | null;
  objectives: Objective[];
  hasCompletedFirstObjective: boolean;
};

type Step = {
  id: string;
  i18n?: (args: TutorialStepArgs) => Record<string, unknown>;
};

const getTutorialStepIndex = ({
  objectives,
  selectionLength,
  selectionValue,
  hasCompletedFirstObjective,
}: TutorialStepArgs): number => {
  if (hasCompletedFirstObjective) return 4;
  if (objectives[0].value === selectionValue) return 3;
  if (selectionLength > 1) return 2;
  if (selectionLength === 1) return 1;
  return 0;
};

const steps: Step[] = [
  { id: "0-start-path" },
  { id: "1-extend-path" },
  {
    id: "2-find-objective",
    i18n: ({ objectives }) => ({ value: objectives[0].value }),
  },
  { id: "3-release-path" },
  { id: "4-solve-objectives" },
];

export function Tutorial(): JSX.Element | null {
  const { t } = useTranslation();

  const { objectivesState, selectionState } = useActiveLevel();

  const stats = useStatisticsStore.use.stats();
  const showTutorial =
    stats.normal.gamesPlayed === 0 &&
    stats.hard.gamesPlayed === 0 &&
    stats.extreme.gamesPlayed === 0;

  if (!showTutorial) return null;

  const tutorialStepArgs: TutorialStepArgs = {
    hasCompletedFirstObjective: objectivesState[0].state === "completed",
    objectives: objectivesState,
    selectionLength: selectionState.length,
    selectionValue: selectionState.value,
  };
  const activeStepIndex = getTutorialStepIndex(tutorialStepArgs);
  const activeStep = steps[activeStepIndex];

  return (
    <div className={classes.tutorial} role="status">
      <IconInfoSquare className={classes.icon} />
      {t(
        `game.tutorial.${activeStep.id}`,
        activeStep.i18n ? activeStep.i18n(tutorialStepArgs) : undefined
      )}
    </div>
  );
}
