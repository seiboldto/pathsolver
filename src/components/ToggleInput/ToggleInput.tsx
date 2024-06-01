import { clsx } from "clsx";
import { useTranslation } from "react-i18next";

import { Group } from "~src/components";
import { useId } from "~src/hooks";
import type { InputProps, SelectData } from "~src/models";
import { useSettingsStore } from "~src/stores";

import toggleButtonClasses from "../ToggleButton/ToggleButton.module.css";
import classes from "./ToggleInput.module.css";

type ToggleInputProps<T> = InputProps & {
  data: SelectData<T, ToggleInputItemProps>;
  value: string;
  onChange: (value: T) => void;
};

type ToggleInputItemProps = {
  square?: boolean;
  label?: React.ReactNode;
};

export function ToggleInput<T extends string>({
  label,
  data,
  value,
  onChange,
  i18nPrefix,
}: ToggleInputProps<T>): JSX.Element {
  const id = useId("toggle-input");
  const { enableHoverAnimations } = useSettingsStore.use.settings();
  const { t } = useTranslation();

  return (
    <>
      <label>{label}</label>
      <Group>
        {data.map((item) => (
          <div
            key={item.value}
            className={clsx(classes.control, item.square && classes.square)}
          >
            <input
              type="radio"
              name={id}
              id={`${id}-${item.value}`}
              value={item.value}
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
              aria-label={item.square ? t(i18nPrefix + item.value) : undefined}
            >
              {item.label === undefined
                ? t(i18nPrefix + item.value)
                : item.label}
            </label>
          </div>
        ))}
      </Group>
    </>
  );
}
