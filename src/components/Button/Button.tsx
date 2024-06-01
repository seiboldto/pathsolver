import { type Icon, type IconProps } from "@tabler/icons-react";
import { clsx } from "clsx";

import classes from "./Button.module.css";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ForwardRefExoticComponent<
    Omit<IconProps, "ref"> & React.RefAttributes<Icon>
  >;
  square?: boolean;
};

export function Button({
  onClick,
  icon,
  children,
  square,
  ...props
}: ButtonProps): JSX.Element {
  const Icon = icon || null;

  return (
    <button
      onClick={onClick}
      className={clsx(
        classes.button,
        icon === undefined && classes.withoutIcon,
        square && classes.square
      )}
      {...props}
    >
      {Icon && (
        <div className={classes.icon}>
          <Icon height={18} />
        </div>
      )}
      <span className={classes.text}>{children}</span>
      <div className={classes.bg} />
      <div className={classes.hoverAnim} />
    </button>
  );
}
