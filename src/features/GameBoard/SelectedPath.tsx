import { type RefObject, useMemo } from "react";

import { type Node } from "~src/models";

import classes from "./SelectedPath.module.css";

type SelectedPathProps = {
  nodeRefs: Record<string, RefObject<HTMLButtonElement>>;
  selectedNodes: Node[];
};

export function SelectedPath({
  nodeRefs,
  selectedNodes,
}: SelectedPathProps): JSX.Element {
  const path = useMemo(() => {
    if (selectedNodes.length < 1) return null;

    //TODO Update to typescript 5.5 to fix this
    const buttons = selectedNodes.map(
      (n) => nodeRefs[n.id].current as HTMLButtonElement
    );

    const getXYFromButton = (button: HTMLButtonElement) => {
      const { offsetLeft: x, offsetTop: y } = button;
      const middleOffset = button.offsetWidth / 2;
      return x + middleOffset + " " + (y + middleOffset);
    };

    const [start, ...rest] = buttons;
    const lines = rest.map((b) => "L " + getXYFromButton(b)).join(" ");

    return "M " + getXYFromButton(start) + lines;
  }, [selectedNodes, nodeRefs]);

  return (
    <svg className={classes.svg} height="100%" width="100%">
      <g>{path && <path d={path} />}</g>
    </svg>
  );
}
