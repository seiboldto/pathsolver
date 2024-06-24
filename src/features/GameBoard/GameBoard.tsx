import { useActiveLevel } from "~src/hooks";
import { cssVars } from "~src/lib";

import classes from "./GameBoard.module.css";

export function GameBoard(): JSX.Element {
  const { nodes, boardSize } = useActiveLevel();

  return (
    <div className={classes.board} style={cssVars({ boardSize })}>
      {nodes.map(({ id, value, column, row }) => (
        <button
          key={id}
          className={classes.node}
          style={cssVars({ row, column })}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
