import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";

import classes from "./SelectedInfo.module.css";

export function SelectedInfo(): JSX.Element {
  const { selectionState, gameState } = useActiveLevel();
  const { t } = useTranslation();

  const hidden = selectionState.value === null || gameState.hasWon;

  return (
    <div
      className={classes.selectedInfo}
      data-hidden={hidden}
      aria-hidden={hidden}
    >
      <span
        key={selectionState.value}
        className={classes.value}
        aria-label={t("game.selected-value")}
        aria-live="polite"
      >
        {selectionState.value}
      </span>
      <div
        key={selectionState.key}
        data-invalid={selectionState.isInvalid}
        className={classes.dots}
      >
        {Array.from({ length: selectionState.length }).map((_, i) => (
          <div key={i} className={classes.dot} />
        ))}
      </div>
    </div>
  );
}
