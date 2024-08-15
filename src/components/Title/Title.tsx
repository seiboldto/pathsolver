type TitleProps = React.BaseHTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
};

export function Title({ children, ...props }: TitleProps): JSX.Element {
  return <h1 {...props}>{children}</h1>;
}
