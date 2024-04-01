import { clsx } from "clsx";
import { useEffect } from "react";

import { useGeneratedLevel } from "~src/hooks";
import { Node as INode } from "~src/models";
import { useLevelStore, useSettingsStore } from "~src/stores";

import classes from "./Node.module.css";

type NodeProps = {
  node: INode;
};

export function Node({ node }: NodeProps): JSX.Element {
  const { enableHoverAnimations } = useSettingsStore.use.settings();
  const { board } = useGeneratedLevel();

  const { selectNode, resetInvalidNode, setInvalidNode } =
    useLevelStore.use.actions();
  const selectedNodes = useLevelStore.use.selectedNodes();
  const isActive = selectedNodes.includes(node);

  const invalidNodeID = useLevelStore.use.invalidNodeID();
  const isInvalid = invalidNodeID === node.id;

  const handleMouseDown = () => {
    selectNode(node, board);
  };

  const handleMouseEnter = () => {
    if (selectedNodes.length === 0) return;
    if (isActive) return;

    if (selectedNodes.length === board.difficulty.maxPathLength) {
      setInvalidNode(node.id);
      return;
    }

    const lastNode = selectedNodes[selectedNodes.length - 1];
    const difference =
      Math.abs(lastNode.row - node.row) +
      Math.abs(lastNode.column - node.column);

    if (difference > 1) {
      setInvalidNode(node.id);
      return;
    }

    selectNode(node, board);
  };

  const handleMouseLeave = () => resetInvalidNode();
  useEffect(() => {
    if (selectedNodes.length === 0 && isInvalid) resetInvalidNode();
  }, [selectedNodes.length, isInvalid, resetInvalidNode]);

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={-1}
      className={clsx(
        classes.node,
        isActive && classes.active,
        isInvalid && classes.invalid,
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
