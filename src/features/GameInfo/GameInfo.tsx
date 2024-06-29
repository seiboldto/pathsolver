import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";

import classes from "./GameInfo.module.css";

export function GameInfo(): JSX.Element {
  const { selection } = useActiveLevel();
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.selectedInfo}>
        <span
          key={selection.value}
          className={classes.value}
          aria-label={t("game.selected-value")}
          aria-live="polite"
        >
          {selection.value ?? 0}
        </span>
        <div
          key={selection.count}
          data-invalid={selection.isInvalid}
          className={classes.dots}
        >
          {Array.from({ length: selection.count }).map((_, i) => (
            <div key={i} className={classes.dot} />
          ))}
        </div>
      </div>
    </>
  );
}
