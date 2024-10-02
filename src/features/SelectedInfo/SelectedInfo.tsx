import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";

import classes from "./SelectedInfo.module.css";

export function SelectedInfo(): JSX.Element {
  const { selectionState, difficultyOptions } = useActiveLevel();
  const { t } = useTranslation();

  return (
    <div className={classes.selectedInfo}>
      <span
        key={selectionState.value}
        className={classes.value}
        aria-label={t("level.selection.selected-value")}
        aria-live="polite"
      >
        {selectionState.value ?? 0}
      </span>
      <div
        key={selectionState.key}
        data-invalid={selectionState.isInvalid}
        className={classes.dots}
        aria-label={
          selectionState.isInvalid
            ? t("level.selection.invalid")
            : t("level.selection.path-length", {
                length: selectionState.length,
                max: difficultyOptions.maxPathLength,
              })
        }
        aria-live="polite"
      >
        {Array.from({ length: difficultyOptions.maxPathLength }).map((_, i) => (
          <div
            key={i}
            className={classes.dot}
            data-active={i < selectionState.length}
          />
        ))}
      </div>
    </div>
  );
}
