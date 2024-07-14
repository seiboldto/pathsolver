import { useEffect } from "react";

import { useActiveLevel } from "~src/hooks";
import { cssVars } from "~src/lib";

import classes from "./GameBoard.module.css";
import { GameEdge } from "./GameEdge";
import { GameNode } from "./GameNode";

export function GameBoard(): JSX.Element {
  const { nodes, edges, boardSize, applySelectedNodes, getGameState } =
    useActiveLevel();

  const gameState = getGameState();

  useEffect(() => {
    if (gameState === "waiting" || gameState === "playing") {
      document.addEventListener("pointerup", applySelectedNodes);

      return () =>
        document.removeEventListener("pointerup", applySelectedNodes);
    }
  }, [applySelectedNodes, gameState]);

  return (
    <div className={classes.board} style={cssVars({ boardSize })}>
      {edges.map((edge) => edge && <GameEdge key={edge.id} edge={edge} />)}
      {nodes.map((node) => node && <GameNode key={node.id} node={node} />)}
      {/* TODO: SHOW LOST STATE */}
    </div>
  );
}
