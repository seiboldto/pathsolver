export type InputProps = {
  label: string;
  i18nPrefix?: string;
};

export type SelectData<T, P = object> = ({
  label?: React.ReactNode;
  value: T;
} & P)[];
