import { useActiveLevel } from "~src/hooks";
import { cssVars } from "~src/lib";

import classes from "./GameBoard.module.css";

export function GameBoard(): JSX.Element {
  const { nodes, edges, boardSize } = useActiveLevel();

  return (
    <div className={classes.board} style={cssVars({ boardSize })}>
      {nodes.map(({ id, value, row, column }) => (
        <button
          key={id}
          className={classes.node}
          style={cssVars({ row, column })}
        >
          {value}
        </button>
      ))}
      {edges.map(({ id, operation, orientation, row, column }) => (
        <div
          key={id}
          className={classes.edge}
          data-orientation={orientation}
          style={cssVars({ row, column })}
        >
          {operation}
        </div>
      ))}
    </div>
  );
}
