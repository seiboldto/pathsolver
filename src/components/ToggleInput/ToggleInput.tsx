import { clsx } from "clsx";

import { Group } from "~src/components";
import { useId } from "~src/hooks";
import type { InputProps, SelectData } from "~src/models";
import { useSettingsStore } from "~src/stores";

import toggleButtonClasses from "../ToggleButton/ToggleButton.module.css";
import classes from "./ToggleInput.module.css";

type ToggleInputProps<T> = InputProps & {
  data: SelectData<T>;
  value: string;
  onChange: (value: T) => void;
};

export function ToggleInput<T extends string>({
  label,
  data,
  value,
  onChange,
}: ToggleInputProps<T>): JSX.Element {
  const id = useId("toggle-input");
  const { enableHoverAnimations } = useSettingsStore.use.settings();

  return (
    <>
      <label>{label}</label>
      <Group>
        {data.map((item) => (
          <div key={item.value} className={classes.control}>
            <input
              type="radio"
              name={id}
              id={`${id}-${item.value}`}
              value={item.label}
              onChange={() => onChange(item.value)}
              checked={item.value === value}
              className={classes.input}
            ></input>
            <label
              htmlFor={`${id}-${item.value}`}
              className={clsx(
                toggleButtonClasses.toggleButton,
                item.value === value && toggleButtonClasses.active,
                enableHoverAnimations && toggleButtonClasses.withHoverAnimations
              )}
            >
              {item.label}
            </label>
          </div>
        ))}
      </Group>
    </>
  );
}
