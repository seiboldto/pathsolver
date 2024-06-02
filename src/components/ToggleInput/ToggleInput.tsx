import { useTranslation } from "react-i18next";

import { Group, Tooltip, Wrap } from "~src/components";
import { useId } from "~src/hooks";
import type { InputProps, SelectData } from "~src/models";

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
  const { t } = useTranslation();

  return (
    <>
      <label>{label}</label>
      <Group>
        {data.map((item) => (
          <div
            key={item.value}
            className={classes.control}
            data-square={item.square === true}
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
            <Wrap
              when={item.square === true}
              component={(c) => (
                <Tooltip label={t(i18nPrefix + item.value)}>{c}</Tooltip>
              )}
            >
              <label
                htmlFor={`${id}-${item.value}`}
                className={classes.toggleButton}
                data-active={item.value === value}
              >
                {item.label === undefined
                  ? t(i18nPrefix + item.value)
                  : item.label}
              </label>
            </Wrap>
          </div>
        ))}
      </Group>
    </>
  );
}
