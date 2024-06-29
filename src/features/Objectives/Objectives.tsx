import { IconCheck } from "@tabler/icons-react";

import { useActiveLevel } from "~src/hooks";

import classes from "./Objectives.module.css";

export function Objectives(): JSX.Element {
  const { objectives, getObjectiveState } = useActiveLevel();

  return (
    <div className={classes.objectives}>
      {objectives.map((o) => {
        const state = getObjectiveState(o);
        return (
          <div key={o.id} className={classes.objective} data-state={state}>
            {state === "completed" ? <IconCheck /> : o.value}
          </div>
        );
      })}
    </div>
  );
}
