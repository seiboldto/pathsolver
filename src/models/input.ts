export type InputProps = {
  label: string;
  i18nPrefix?: string;
};

export type SelectData<T, P = object> = ({
  value: T;
} & P)[];
