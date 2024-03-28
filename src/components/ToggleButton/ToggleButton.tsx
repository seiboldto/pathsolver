import { clsx } from "clsx";

import { useSettingsStore } from "~src/stores";

import classes from "./ToggleButton.module.css";

export type ToggleButtonProps = {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export function ToggleButton({
  onClick,
  active,
  children,
}: ToggleButtonProps): JSX.Element {
  const { enableHoverAnimations } = useSettingsStore.use.settings();

  return (
    <button
      onClick={onClick}
      className={clsx(
        classes.toggleButton,
        active && classes.active,
        enableHoverAnimations && classes.withHoverAnimations
      )}
    >
      {children}
    </button>
  );
}
