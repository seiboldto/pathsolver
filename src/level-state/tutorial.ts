import type { Objective } from "~src/models";

type GetTutorialState = {
  selectionLength: number;
  selectionValue: number | null;
  objectives: Objective[];
  hasCompletedFirstObjective: boolean;
};

type TutorialState = {
  step: {
    id: string;
    i18n: Record<string, unknown>;
  };
};

type Step = {
  id: string;
  i18n?: (args: GetTutorialState) => Record<string, unknown>;
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

const getTutorialStepIndex = ({
  objectives,
  selectionLength,
  selectionValue,
  hasCompletedFirstObjective,
}: GetTutorialState): number => {
  if (hasCompletedFirstObjective) return 4;
  if (objectives[0].value === selectionValue && selectionLength > 1) return 3;
  if (selectionLength > 1) return 2;
  if (selectionLength === 1) return 1;
  return 0;
};

export const getTutorialState = (args: GetTutorialState): TutorialState => {
  const index = getTutorialStepIndex(args);
  const step = steps[index];

  return {
    step: {
      id: step.id,
      i18n: step.i18n ? step.i18n(args) : {},
    },
  };
};