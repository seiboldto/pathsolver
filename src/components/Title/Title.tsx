import classes from "./Title.module.css";

type TitleProps = React.BaseHTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  small?: boolean;
};

export function Title({ children, small, ...props }: TitleProps): JSX.Element {
  return (
    <h1 className={classes.title} data-small={small} {...props}>
      {children}
    </h1>
  );
}
