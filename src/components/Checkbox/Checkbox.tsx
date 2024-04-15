import { IconCheck } from "@tabler/icons-react";
import { clsx } from "clsx";

import { type InputProps } from "~src/models";
import { useSettingsStore } from "~src/stores";

import classes from "./Checkbox.module.css";

type CheckboxProps = InputProps & {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function Checkbox({
  label,
  checked,
  onChange,
}: CheckboxProps): JSX.Element {
  const { enableHoverAnimations } = useSettingsStore.use.settings();

  return (
    <label
      className={clsx(
        classes.checkbox,
        enableHoverAnimations && classes.withHoverAnimations
      )}
    >
      {label}
      <input
        type="checkbox"
        checked={checked}
        onClick={() => onChange(!checked)}
      />
      <span>
        <IconCheck className={classes.check} />
      </span>
    </label>
  );
}
