import { IconCheck } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";

import classes from "./Objectives.module.css";

export function Objectives(): JSX.Element {
  const { t } = useTranslation();
  const { objectives, getObjectiveState } = useActiveLevel();

  return (
    <div
      className={classes.objectives}
      role="group"
      aria-label={t("game.objectives.title")}
    >
      {objectives.map((o) => {
        const state = getObjectiveState(o);
        return (
          <div
            key={o.id}
            className={classes.objective}
            data-state={state}
            aria-current={state === "active" ? "step" : "false"}
            aria-label={t("game.objectives.index", {
              count: o.index + 1,
              ordinal: true,
            })}
            aria-description={t(`game.objectives.${state}`)}
          >
            {state === "completed" ? <IconCheck /> : o.value}
          </div>
        );
      })}
    </div>
  );
}
