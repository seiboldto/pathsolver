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
  const svg = useMemo(() => {
    if (selectedNodes.length < 1) return null;

    const getXYFromButton = (button: HTMLButtonElement) => {
      const { offsetLeft: x, offsetTop: y } = button;
      const middleOffset = button.offsetWidth / 2;
      return { x: x + middleOffset, y: y + middleOffset };
    };

    //TODO Update to typescript 5.5 to fix this
    const buttons = selectedNodes
      .map((n) => nodeRefs[n.id].current as HTMLButtonElement)
      .map((b) => getXYFromButton(b));

    const [start, ...rest] = buttons;
    const lines = rest.map((b) => "L " + b.x + " " + b.y).join(" ");
    const path = "M " + start.x + " " + start.y + lines;

    return { path };
  }, [selectedNodes, nodeRefs]);

  return (
    <svg className={classes.svg} height="100%" width="100%">
      <g>{svg && <path d={svg.path} />}</g>
    </svg>
  );
}
