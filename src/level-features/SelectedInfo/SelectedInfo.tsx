import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";

import classes from "./SelectedInfo.module.css";

export function SelectedInfo(): JSX.Element {
  const { selectionState } = useActiveLevel();
  const { t } = useTranslation();

  return (
    <div className={classes.selectedInfo}>
      <span
        key={selectionState.value}
        className={classes.value}
        aria-label={t("level.selected-value")}
        aria-live="polite"
      >
        {selectionState.value ?? 0}
      </span>
    </div>
  );
}
