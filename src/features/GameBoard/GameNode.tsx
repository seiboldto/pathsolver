import { forwardRef } from "react";

import { useActiveLevel } from "~src/hooks";
import { cssVars } from "~src/lib";
import { type Node } from "~src/models";

import classes from "./GameNode.module.css";

type GameNodeProps = {
  node: Node;
};

export const GameNode = forwardRef<HTMLButtonElement, GameNodeProps>(
  function GameNode({ node }, ref): JSX.Element {
    const { value, row, column } = node;
    const { selectNode, resetInvalidNode, getNodeState } = useActiveLevel();

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
      selectNode(node, "initial");
    };

    const handlePointerEnter = () => {
      selectNode(node, "sequential");
    };

    const nodeState = getNodeState(node);

    return (
      <button
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={resetInvalidNode}
        onPointerUp={resetInvalidNode}
        className={classes.node}
        style={cssVars({ row, column })}
        tabIndex={-1}
        data-node-state={nodeState}
        ref={ref}
      >
        {value}
      </button>
    );
  }
);
