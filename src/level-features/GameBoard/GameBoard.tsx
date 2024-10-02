import { useEffect } from "react";

import { useActiveLevel } from "~src/hooks";
import { cssVars } from "~src/lib";
import { useLevelStore } from "~src/stores";

import classes from "./GameBoard.module.css";
import { GameEdge } from "./GameEdge";
import { GameNode } from "./GameNode";

export function GameBoard(): JSX.Element {
  const { resetSelection, updateGameBoard } = useLevelStore.use.actions();
  const forceDisableAnimationKey = useLevelStore.use.forceDisableAnimationKey();

  const {
    nodes,
    edges,
    boardSize,
    gameState,
    applySelectedNodes,
    handleGameStep,
  } = useActiveLevel();

  useEffect(() => {
    if (gameState.state === "waiting" || gameState.state === "playing") {
      const handlePointerUp = () => {
        const result = applySelectedNodes();
        if (result === "ignore") return;
        if (result === "not-applicable") return resetSelection();

        handleGameStep(result);
        resetSelection();
      };

      document.addEventListener("pointerup", handlePointerUp);

      return () => document.removeEventListener("pointerup", handlePointerUp);
    }
  }, [
    resetSelection,
    applySelectedNodes,
    updateGameBoard,
    handleGameStep,
    gameState.state,
  ]);

  return (
    <div
      className={classes.board}
      style={cssVars({ boardSize })}
      key={forceDisableAnimationKey}
    >
      {edges.map((edge) => (
        <GameEdge key={edge.id} edge={edge} />
      ))}
      {nodes.map((node) => (
        <GameNode key={node.id} node={node} />
      ))}
    </div>
  );
}
