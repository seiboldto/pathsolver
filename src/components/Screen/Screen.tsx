import { clsx } from "clsx";

import classes from "./Screen.module.css";

export type ScreenProps = {
  children: React.ReactNode;
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
};

export function Screen({ children, gap }: ScreenProps): JSX.Element {
  return (
    <main className={clsx(classes.main, classes["gap-" + (gap || "xs")])}>
      {children}
    </main>
  );
}
