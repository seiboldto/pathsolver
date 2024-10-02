import { IconBulb, IconCheck } from "@tabler/icons-react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { Tooltip } from "~src/components";
import { useActiveLevel } from "~src/hooks";

import classes from "./Objectives.module.css";

export function Objectives(): JSX.Element {
  const { t } = useTranslation();
  const { objectivesState, hint } = useActiveLevel();

  return (
    <div
      className={classes.objectives}
      role="group"
      aria-label={t("game.objectives.title")}
    >
      {objectivesState.map((o, i) => {
        const isLastOne = i === objectivesState.length - 1;

        const { state } = o;
        const rightChevronState = state;
        const leftChevronState = isLastOne
          ? "pending"
          : objectivesState[i + 1].state;

        return (
          <Fragment key={o.id}>
            <Tooltip
              label={t("game.objectives.index", {
                count: o.index + 1,
                ordinal: true,
              })}
            >
              <div
                className={classes.objective}
                data-state={state}
                aria-current={state === "active" ? "step" : "false"}
                aria-description={t(`game.objectives.${state}`)}
              >
                <span>{state === "completed" ? <IconCheck /> : o.value}</span>
                {hint && hint.objectiveIndex === i && (
                  <IconBulb className={classes.hintIndicator} size={16} />
                )}
              </div>
            </Tooltip>
            {!isLastOne && (
              <svg className={classes.chevron} viewBox="0 0 20 10">
                <g data-state={rightChevronState}>
                  <polygon points="0,0 4.5,0 9.5,5 4.5,10 0,10" />
                  <path d="M 0 0 L 4.5 0 " className={classes.horizontal} />
                  <path d="M 0 10 L 4.5 10 " className={classes.horizontal} />
                  <path
                    d="M 4.5 0 L 9.5 5 L 4.5 10"
                    className={classes.diagonal}
                  />
                </g>
                <g data-state={leftChevronState}>
                  <polygon points="10.5,0 20,0 20,10 10.5,10 15.5,5" />
                  <path d="M 10.5 0 L 20 0 " className={classes.horizontal} />
                  <path d="M 10.5 10 L 20 10 " className={classes.horizontal} />
                  <path
                    d="M 10.5 0 L 15.5 5 L 10.5 10"
                    className={classes.diagonal}
                    fill="none"
                  />
                </g>
              </svg>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
