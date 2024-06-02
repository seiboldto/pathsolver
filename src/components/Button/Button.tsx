import { type Icon, type IconProps } from "@tabler/icons-react";
import { forwardRef } from "react";

import classes from "./Button.module.css";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ForwardRefExoticComponent<
    Omit<IconProps, "ref"> & React.RefAttributes<Icon>
  >;
  square?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { onClick, icon, children, square, ...props }: ButtonProps,
    ref
  ): JSX.Element {
    const Icon = icon || null;

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={classes.button}
        data-square={square}
        data-icon={icon !== undefined}
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
);
