type WrapProps<T> = {
  when?: boolean;
  component: (children: T) => JSX.Element;
  children: T;
};

export function Wrap<T>({
  when,
  component,
  children,
}: WrapProps<T>): JSX.Element {
  if (when === true) return component(children);
  return <>{children}</>;
}
