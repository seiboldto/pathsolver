import { clsx } from "clsx";

import { useSettingsStore } from "~src/stores";

import classes from "./ToggleButton.module.css";

export type ToggleButtonProps = {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  square?: boolean;
};

export function ToggleButton({
  onClick,
  active,
  children,
  square,
}: ToggleButtonProps): JSX.Element {
  const { enableHoverAnimations } = useSettingsStore.use.settings();

  return (
    <button
      onClick={onClick}
      className={clsx(
        classes.toggleButton,
        active && classes.active,
        square && classes.square,
        enableHoverAnimations && classes.withHoverAnimations
      )}
    >
      {children}
    </button>
  );
}
