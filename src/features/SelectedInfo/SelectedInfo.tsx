import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";

import classes from "./SelectedInfo.module.css";

export function SelectedInfo(): JSX.Element {
  const { selection } = useActiveLevel();
  const { t } = useTranslation();

  const selectedValue = selection.value ?? 0;

  return (
    <div className={classes.selectedInfo}>
      <span
        key={selectedValue}
        className={classes.value}
        aria-label={t("game.selected-value")}
        aria-live="polite"
      >
        {selectedValue}
      </span>
      <div
        key={selection.key}
        data-invalid={selection.isInvalid}
        className={classes.dots}
      >
        {Array.from({ length: selection.count }).map((_, i) => (
          <div key={i} className={classes.dot} />
        ))}
      </div>
    </div>
  );
}
