import {
  IconDivide,
  IconMinus,
  IconPlus,
  type IconProps,
  IconX,
} from "@tabler/icons-react";

import { OperationKind } from "~src/levels";

export type OperationIconProps = { kind: OperationKind };

export function OperationIcon({ kind }: OperationIconProps): JSX.Element {
  const icons: Record<
    OperationKind,
    React.ForwardRefExoticComponent<Omit<IconProps, "ref">>
  > = {
    addition: IconPlus,
    subtraction: IconMinus,
    multiplication: IconX,
    division: IconDivide,
  };

  const Icon = icons[kind];

  return <Icon />;
}
