import { IconCheck } from "@tabler/icons-react";

import { type InputProps } from "~src/models";

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
  return (
    <label className={classes.checkbox}>
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <span>
        <IconCheck className={classes.check} />
      </span>
    </label>
  );
}
