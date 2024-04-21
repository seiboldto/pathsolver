import { Group, ToggleButton } from "~src/components";
import type { InputProps, SelectData } from "~src/models";

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
  return (
    <>
      <label>{label}</label>
      <Group>
        {data.map((item) => (
          <ToggleButton
            key={item.value}
            active={value === item.value}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </ToggleButton>
        ))}
      </Group>
    </>
  );
}
