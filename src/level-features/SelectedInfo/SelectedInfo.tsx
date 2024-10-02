import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";

import classes from "./SelectedInfo.module.css";

export function SelectedInfo(): JSX.Element {
  const { hint, activeObjectiveIndex, selectionState } = useActiveLevel();
  const { t } = useTranslation();

  return (
    <div className={classes.selectedInfo}>
      <span
        className={classes.value}
        aria-live="polite"
        aria-label={t("level.selection.selected-value")}
        aria-description={
          selectionState.isInvalid ? t("level.selection.invalid") : undefined
        }
        data-invalid={selectionState.isInvalid}
      >
        {selectionState.value ?? 0}
      </span>
      {hint && activeObjectiveIndex === hint.objectiveIndex && (
        <div
          className={classes.dots}
          aria-label={t("level.hints.selection-length-hint", {
            length: selectionState.length,
            max: hint.pathLength,
          })}
        >
          {Array.from({ length: hint.pathLength }).map((_, i) => (
            <div
              key={i}
              className={classes.dot}
              data-active={i < selectionState.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}
