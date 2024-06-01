import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Button } from "~src/components";
import { useId } from "~src/hooks";
import type { InputProps, SelectData } from "~src/models";

import classes from "./Select.module.css";

type SelectProps<T> = InputProps & {
  data: SelectData<T, SelectItemProps>;
  value: T;
  onChange: (value: T) => void;
};

export type SelectItemProps = {
  label?: string;
};

export function Select<T extends string>({
  label,
  data,
  value,
  onChange,
  i18nPrefix,
}: SelectProps<T>): JSX.Element {
  const { t } = useTranslation();
  const id = useId("select");

  const handleNext = () => selectByIndex((i) => i + 1);
  const handlePrev = () => selectByIndex((i) => i - 1);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") handlePrev();
    if (e.key === "ArrowRight" || e.key === "ArrowUp") handleNext();
  };

  const currentIndex = data.findIndex((d) => d.value === value);
  const selectByIndex = (computeIndex: (index: number) => number): void => {
    const nextIndex = computeIndex(currentIndex);
    const wrappedIndex =
      nextIndex < 0
        ? data.length - 1
        : nextIndex === data.length
        ? 0
        : nextIndex;

    onChange(data[wrappedIndex].value);
  };

  const selected = data.find((d) => d.value === value)!;
  const selectedLabel =
    selected.label === undefined
      ? t(i18nPrefix + selected.value)
      : selected.label;

  return (
    <>
      <label id={id}>{label}</label>
      <div className={classes.select}>
        <Button
          square
          onClick={handlePrev}
          tabIndex={-1}
          aria-label={t("ui.prev")}
        >
          <IconCaretLeftFilled />
        </Button>
        <div
          onKeyDown={handleKeyDown}
          className={classes.selected}
          tabIndex={0}
          role="spinbutton"
          aria-labelledby={id}
          aria-valuenow={currentIndex}
          aria-valuetext={selectedLabel}
        >
          {selectedLabel}
        </div>
        <Button
          square
          onClick={handleNext}
          tabIndex={-1}
          aria-label={t("ui.next")}
        >
          <IconCaretRightFilled />
        </Button>
      </div>
    </>
  );
}
