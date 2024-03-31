import { clsx } from "clsx";
import { useState } from "react";

import { useGeneratedLevel } from "~src/hooks";
import { Node as INode } from "~src/models";
import { useLevelStore, useSettingsStore } from "~src/stores";

import classes from "./Node.module.css";

type NodeProps = {
  node: INode;
};

export function Node({ node }: NodeProps): JSX.Element {
  const [isInvalidPath, setIsInvalidPath] = useState(false);

  const { enableHoverAnimations } = useSettingsStore.use.settings();
  const { board } = useGeneratedLevel();

  const { selectNode } = useLevelStore.use.actions();
  const selectedNodes = useLevelStore.use.selectedNodes();
  const isActive = selectedNodes.includes(node);

  const handleMouseDown = () => {
    selectNode(node, board);
  };

  const handleMouseEnter = () => {
    if (selectedNodes.length === 0) return;
    if (isActive) return;

    const lastNode = selectedNodes[selectedNodes.length - 1];
    const difference =
      Math.abs(lastNode.row - node.row) +
      Math.abs(lastNode.column - node.column);

    if (difference > 1) {
      setIsInvalidPath(true);
      return;
    }

    selectNode(node, board);
  };

  const handleMouseLeave = () => setIsInvalidPath(false);

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={-1}
      className={clsx(
        classes.node,
        isActive && classes.active,
        isInvalidPath && classes.invalid,
        enableHoverAnimations && classes.withHoverAnimations
      )}
      style={
        { "--row": node.row, "--column": node.column } as React.CSSProperties
      }
    >
      {node.value}
    </button>
  );
}
