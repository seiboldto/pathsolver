import { type Icon, type IconProps } from "@tabler/icons-react";

import classes from "./Button.module.css";

export type ButtonProps = {
  onClick?: () => void;
  icon?: React.ForwardRefExoticComponent<
    Omit<IconProps, "ref"> & React.RefAttributes<Icon>
  >;
  children: React.ReactNode;
};

export function Button({ onClick, icon, children }: ButtonProps): JSX.Element {
  const Icon = icon || null;

  return (
    <button onClick={onClick} className={classes.button}>
      {Icon && (
        <div>
          <Icon />
        </div>
      )}
      <span>{children}</span>
    </button>
  );
}
