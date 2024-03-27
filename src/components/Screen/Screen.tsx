import classes from "./Screen.module.css";

export type ScreenProps = {
  children: React.ReactNode;
};

export function Screen({ children }: ScreenProps): JSX.Element {
  return <main className={classes.main}>{children}</main>;
}
