export type TitleProps = {
  children: React.ReactNode;
};

export function Title({ children }: TitleProps): JSX.Element {
  return <h1>{children}</h1>;
}
