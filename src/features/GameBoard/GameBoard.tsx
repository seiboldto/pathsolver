import { createRef, type RefObject, useEffect, useMemo } from "react";

import { useActiveLevel } from "~src/hooks";
import { cssVars } from "~src/lib";

import classes from "./GameBoard.module.css";
import { GameNode } from "./GameNode";
import { SelectedPath } from "./SelectedPath";

export function GameBoard(): JSX.Element {
  const { nodes, edges, boardSize, selectedNodes, applySelectedNodes } =
    useActiveLevel();

  const nodeRefs = useMemo(() => {
    const refs: Record<string, RefObject<HTMLButtonElement>> = {};
    nodes.forEach((n) => (refs[n.id] = createRef()));
    return refs;
  }, [nodes]);

  useEffect(() => {
    document.addEventListener("pointerup", applySelectedNodes);

    return () => document.removeEventListener("pointerup", applySelectedNodes);
  }, [applySelectedNodes]);

  return (
    <div className={classes.board} style={cssVars({ boardSize })}>
      <SelectedPath nodeRefs={nodeRefs} selectedNodes={selectedNodes} />
      {nodes.map((node) => (
        <GameNode key={node.id} node={node} ref={nodeRefs[node.id]} />
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
