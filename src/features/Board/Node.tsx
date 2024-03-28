import { clsx } from "clsx";

import { Node as INode } from "~src/models";
import { useSettingsStore } from "~src/stores";

import classes from "./Node.module.css";

type NodeProps = {
  node: INode;
};

export function Node({ node }: NodeProps): JSX.Element {
  const { enableHoverAnimations } = useSettingsStore.use.settings();

  return (
    <button
      className={clsx(
        classes.node,
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
