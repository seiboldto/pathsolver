import type { Icon, IconProps } from "@tabler/icons-react";

import classes from "./Anchor.module.css";

type AnchorProps = {
  children: React.ReactNode;
  href: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<IconProps, "ref"> & React.RefAttributes<Icon>
  >;
};

export function Anchor({ children, href, icon }: AnchorProps): JSX.Element {
  const Icon = icon || null;

  return (
    <a className={classes.anchor} href={href} target="_blank" rel="noreferrer">
      {Icon && <Icon />}
      {children}
    </a>
  );
}
