import { useEffect } from "react";

import { useActiveLevel } from "~src/hooks";
import { cssVars } from "~src/lib";

import classes from "./GameBoard.module.css";
import { GameEdge } from "./GameEdge";
import { GameNode } from "./GameNode";

export function GameBoard(): JSX.Element {
  const { nodes, edges, boardSize, applySelectedNodes } = useActiveLevel();

  useEffect(() => {
    document.addEventListener("pointerup", applySelectedNodes);

    return () => document.removeEventListener("pointerup", applySelectedNodes);
  }, [applySelectedNodes]);

  return (
    <div className={classes.board} style={cssVars({ boardSize })}>
      {edges.map((edge) => (
        <GameEdge key={edge.id} edge={edge} />
      ))}
      {nodes.map(
        (node) => node.visible && <GameNode key={node.id} node={node} />
      )}
    </div>
  );
}
