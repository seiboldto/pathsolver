import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";

import classes from "./SelectedInfo.module.css";

export function SelectedInfo(): JSX.Element {
  const { selectionState } = useActiveLevel();
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
    </div>
  );
}
