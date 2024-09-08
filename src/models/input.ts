export type InputProps = {
  label: string;
};

export type SelectData<T, P = object> = ({
  label: string;
  value: T;
} & P)[];
