export type InputProps = {
  label: string;
  i18nPrefix?: string;
};

export type SelectData<T> = {
  label?: React.ReactNode;
  value: T;
}[];
