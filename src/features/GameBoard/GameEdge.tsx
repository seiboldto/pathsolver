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

  return (
    <div
      key={id}
      className={classes.edge}
      data-orientation={orientation}
      style={cssVars({ row, column })}
      aria-label={t(`game.operations.${operation.kind}`)}
    >
      <Icon size={18} />
    </div>
  );
}
