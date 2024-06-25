import { useEffect } from "react";

import { useActiveLevel } from "~src/hooks";
import { cssVars } from "~src/lib";

import classes from "./GameBoard.module.css";
import { GameNode } from "./GameNode";

export function GameBoard(): JSX.Element {
  const { nodes, edges, boardSize, applySelectedNodes } = useActiveLevel();

  useEffect(() => {
    document.addEventListener("pointerup", applySelectedNodes);

    return () => document.removeEventListener("pointerup", applySelectedNodes);
  }, [applySelectedNodes]);

  return (
    <div className={classes.board} style={cssVars({ boardSize })}>
      {nodes.map((node) => (
        <GameNode key={node.id} node={node} />
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
