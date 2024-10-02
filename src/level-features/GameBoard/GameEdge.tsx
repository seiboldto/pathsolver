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
import { type OperationKind } from "~src/level-gen";
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

export function GameEdge({ edge }: GameEdgeProps): JSX.Element | null {
  const { id, operation, orientation, row, column } = edge;
  const { t } = useTranslation();

  const Icon = OPERATION_ICONS[operation];
  const { hint, getEdgeState, getEdgeNodeCoords } = useActiveLevel();
  const state = getEdgeState({ edge });

  if (!edge.active && state !== "highlighted" && state !== "subtle-highlighted")
    return null;

  const [n1, n2] = getEdgeNodeCoords({ edge });

  const description =
    hint && (state === "highlighted" || state === "subtle-highlighted")
      ? t("level.hints.edge-hint", {
          count: hint.objectiveIndex + 1,
          ordinal: true,
        })
      : undefined;

  return (
    <div
      key={id}
      className={classes.edge}
      data-orientation={orientation}
      style={cssVars({ row, column })}
      aria-label={t(`level.edges.label`, {
        n1,
        n2,
        operation: t(`level.operations.${operation}`),
      })}
      aria-description={description}
      data-state={state}
    >
      <Icon size={18} />
    </div>
  );
}
