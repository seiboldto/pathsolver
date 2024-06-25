import {
  type Icon,
  IconDivide,
  IconMinus,
  IconPlus,
  type IconProps,
  IconX,
} from "@tabler/icons-react";
import { type ForwardRefExoticComponent, type RefAttributes } from "react";
import { useTranslation } from "react-i18next";

import { useActiveLevel } from "~src/hooks";
import { OperationKind } from "~src/levels";
import { cssVars } from "~src/lib";
import { type Edge } from "~src/models";

import classes from "./GameEdge.module.css";

const OPERATION_ICONS: Record<
  OperationKind,
  ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
> = {
  addition: IconPlus,
  subtraction: IconMinus,
  multiplication: IconX,
  division: IconDivide,
};

type GameEdgeProps = {
  edge: Edge;
};

export function GameEdge({ edge }: GameEdgeProps): JSX.Element {
  const { id, operation, orientation, row, column } = edge;
  const { t } = useTranslation();

  const Icon = OPERATION_ICONS[operation.kind];
  const { getEdgeState } = useActiveLevel();
  const state = getEdgeState(edge);

  return (
    <div
      key={id}
      className={classes.edge}
      data-orientation={orientation}
      style={cssVars({ row, column })}
      aria-label={t(`game.operations.${operation.kind}`)}
      data-selected={state !== "idle"}
    >
      <Icon size={18} />
      {state !== "idle" && <Arrow direction={state} />}
    </div>
  );
}

type ArrowProps = {
  direction: "right" | "left" | "up" | "down";
};

function Arrow({ direction }: ArrowProps): JSX.Element {
  const INNER_WIDTH = 30;
  const ARROW_WIDTH = 30;

  const width = 200;
  const height = 100;

  const innerLeft = (width - INNER_WIDTH) / 2;
  const innerRight = innerLeft + INNER_WIDTH + 0;

  const arrow1Left = innerLeft - ARROW_WIDTH;
  const arrow2Right = innerRight + ARROW_WIDTH;

  return (
    <svg
      className={classes.arrow}
      data-direction={direction}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d={`M ${arrow1Left} 0 L ${innerLeft} ${
          height / 2
        } L ${arrow1Left} ${height} L ${innerLeft} ${height} L ${innerLeft} 0`}
      />
      <path
        d={`M ${innerLeft} 0 L ${innerLeft} ${height} L ${innerRight} ${height} L ${innerRight} 0`}
      />
      <path
        d={`M ${innerRight} 0 L ${arrow2Right} ${
          height / 2
        } L ${innerRight} ${height} `}
      />
    </svg>
  );
}
