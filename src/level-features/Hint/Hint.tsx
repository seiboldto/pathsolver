import { IconBulb } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";

import classes from "./Hint.module.css";

// TODO: Refactor tutorial and hint into single component
// TODO: Create hint state

export function Hint(): JSX.Element | null {
  const { t } = useTranslation();

  const { hint, activeObjectiveIndex } = useActiveLevel();

  const showHint = hint && activeObjectiveIndex <= hint.objectiveIndex;

  if (!showHint) return null;

  return (
    <div className={classes.hint} role="status">
      <IconBulb className={classes.icon} />
      {t(`level.hints.hint`, {
        count: hint.objectiveIndex + 1,
        ordinal: true,
        length: hint.pathLength,
      })}
    </div>
  );
}
