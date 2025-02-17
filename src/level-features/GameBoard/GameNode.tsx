import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";
import { cssVars } from "~src/lib";
import { type Node } from "~src/models";
import { useLevelStore, useSettingsStore } from "~src/stores";

import classes from "./GameNode.module.css";

type GameNodeProps = {
  node: Node;
};

export function GameNode({ node }: GameNodeProps): JSX.Element | null {
  const { t } = useTranslation();

  const { value, row, column } = node;
  const { canNodeBeSelected, getNodeState, applySelectedNode } =
    useActiveLevel();
  const { setSelection, setInvalidNode } = useLevelStore.use.actions();

  const { increasedNodeSize } = useSettingsStore.use.settings();

  const selectNode = (node: Node, type: "click" | "hover") => {
    const selectable = canNodeBeSelected({ node, type });
    if (selectable === "ignore") return;
    if (selectable === "not-selectable") return setInvalidNode(node);

    const selection = applySelectedNode({ node });
    setSelection(selection);
  };

  const resetInvalidNode = () => setInvalidNode(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    selectNode(node, "click");
  };

  const handlePointerEnter = () => {
    selectNode(node, "hover");
  };

  const nodeState = getNodeState({ node });

  if (!node.active) return null;

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
      aria-label={t("level.nodes.label", { row, column })}
      data-expand-nodes={increasedNodeSize}
    >
      {value}
    </button>
  );
}
