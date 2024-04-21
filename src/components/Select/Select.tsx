import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";

import { Button } from "~src/components";
import type { InputProps, SelectData } from "~src/models";

import classes from "./Select.module.css";

type SelectProps<T> = InputProps & {
  data: SelectData<T>;
  value: string;
  onChange: (value: T) => void;
};

export function Select<T extends string>({
  label,
  data,
  value,
  onChange,
}: SelectProps<T>): JSX.Element {
  const handleNext = () => selectByIndex((i) => i + 1);
  const handlePrev = () => selectByIndex((i) => i - 1);

  const selectByIndex = (computeIndex: (index: number) => number): void => {
    const currentIndex = data.findIndex((d) => d.value === value);

    const nextIndex = computeIndex(currentIndex);
    const wrappedIndex =
      nextIndex < 0
        ? data.length - 1
        : nextIndex === data.length
        ? 0
        : nextIndex;

    onChange(data[wrappedIndex].value);
  };

  const selected = data.find((d) => d.value === value);

  return (
    <>
      <label>{label}</label>
      <div className={classes.select}>
        <Button square onClick={handlePrev}>
          <IconCaretLeftFilled />
        </Button>
        {selected?.label}
        <Button square onClick={handleNext}>
          <IconCaretRightFilled />
        </Button>
      </div>
    </>
  );
}
