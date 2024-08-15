import { useEffect } from "react";

import { useActiveLevel } from "~src/hooks";
import { cssVars } from "~src/lib";
import { useLevelStore } from "~src/stores";

import classes from "./GameBoard.module.css";
import { GameEdge } from "./GameEdge";
import { GameNode } from "./GameNode";

export function GameBoard(): JSX.Element {
  const { resetSelection, advanceObjectives, checkForGameWin } =
    useLevelStore.use.actions();

  const { nodes, edges, boardSize, gameState, applySelectedNodes, level } =
    useActiveLevel();

  const { preset } = level.board.difficulty.options;
  useEffect(() => {
    if (gameState.state === "waiting" || gameState.state === "playing") {
      const handlePointerUp = () => {
        const result = applySelectedNodes();
        if (result === "not-applicable") return resetSelection();

        const { nodes, edges } = result;

        advanceObjectives(nodes, edges);
        checkForGameWin(preset);
        resetSelection();
      };

      document.addEventListener("pointerup", handlePointerUp);

      return () => document.removeEventListener("pointerup", handlePointerUp);
    }
  }, [
    resetSelection,
    advanceObjectives,
    applySelectedNodes,
    checkForGameWin,
    gameState.state,
    preset,
  ]);

  return (
    <div className={classes.board} style={cssVars({ boardSize })}>
      {edges.map((edge) => (
        <GameEdge key={edge.id} edge={edge} />
      ))}
      {nodes.map((node) => (
        <GameNode key={node.id} node={node} />
      ))}
    </div>
  );
}
