import { IconDivide, IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { clsx } from "clsx";

import { useGeneratedLevel } from "~src/hooks";
import { type OperationKind } from "~src/levels";
import { useLevelStore } from "~src/stores";

import classes from "./Board.module.css";
import { Node } from "./Node";

const operationIcons: Record<OperationKind, JSX.Element> = {
  addition: <IconPlus size={16} />,
  subtraction: <IconMinus size={16} />,
  multiplication: <IconX size={16} />,
  division: <IconDivide size={16} />,
};

export function Board(): JSX.Element {
  const generatedLevel = useGeneratedLevel();
  const nodes = useLevelStore.use.nodes();

  const { boardSize } = generatedLevel.board.difficulty;
  const { edges } = generatedLevel.board;

  return (
    <div
      className={classes.board}
      style={
        {
          "--board-size": boardSize,
        } as React.CSSProperties
      }
    >
      {nodes.map((n) => (
        <Node node={n} key={n.id} />
      ))}
      {edges.map((edge, i) => {
        const isHorizontal = i < edges.length / 2;
        const boardSizeOffset = isHorizontal ? 1 : 0;
        const index = isHorizontal ? i : i - edges.length / 2;

        return (
          <div
            key={i}
            className={clsx(
              classes.edge,
              isHorizontal ? classes.horizontal : classes.vertical
            )}
            style={
              {
                "--row": Math.floor(index / (boardSize - boardSizeOffset)),
                "--column": index % (boardSize - boardSizeOffset),
              } as React.CSSProperties
            }
          >
            {operationIcons[edge.kind]}
          </div>
        );
      })}
    </div>
  );
}
