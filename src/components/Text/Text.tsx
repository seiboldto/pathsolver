import classes from "./Text.module.css";

type TextProps = React.BaseHTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
  dimmed?: boolean;
};

export function Text({ children, dimmed, ...props }: TextProps): JSX.Element {
  return (
    <p className={classes.text} data-dimmed={dimmed} {...props}>
      {children}
    </p>
  );
}
