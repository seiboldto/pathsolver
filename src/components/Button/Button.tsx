import { type Icon, type IconProps } from "@tabler/icons-react";
import { clsx } from "clsx";

import { useSettingsStore } from "~src/stores/settings-store";

import classes from "./Button.module.css";

export type ButtonProps = {
  onClick?: () => void;
  icon?: React.ForwardRefExoticComponent<
    Omit<IconProps, "ref"> & React.RefAttributes<Icon>
  >;
  fullWidth?: boolean;
  children: React.ReactNode;
};

export function Button({
  onClick,
  icon,
  fullWidth,
  children,
}: ButtonProps): JSX.Element {
  const { enableHoverAnimations } = useSettingsStore.use.settings();

  const Icon = icon || null;

  return (
    <button
      onClick={onClick}
      className={clsx(
        classes.button,
        icon === undefined && classes.withoutIcon,
        fullWidth && classes.fullWidth,
        enableHoverAnimations && classes.withHoverAnimations
      )}
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
