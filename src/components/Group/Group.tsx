import classes from "./Group.module.css";

export type GroupProps = {
  children: React.ReactNode;
};

export function Group({ children }: GroupProps): JSX.Element {
  return <div className={classes.group}>{children}</div>;
}