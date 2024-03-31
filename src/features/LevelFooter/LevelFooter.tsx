import { useLevelStore } from "~src/stores";

import classes from "./LevelFooter.module.css";

export function LevelFooter(): JSX.Element {
  const selectedValue = useLevelStore.use.selectedValue();

  return <div className={classes.selectedValue}>{selectedValue}</div>;
}
