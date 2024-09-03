import {
  type Icon,
  IconBrandWhatsapp,
  IconMail,
  type IconProps,
} from "@tabler/icons-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { useTranslation } from "react-i18next";

import classes from "./SocialButton.module.css";

type Socials = "email" | "whatsapp";

type SocialButtonProps = {
  type: Socials;
  shareLink: string;
};

const ICONS: Record<
  Socials,
  ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
> = {
  email: IconMail,
  whatsapp: IconBrandWhatsapp,
};

const LINKS: Record<Socials, (shareLink: string) => string> = {
  email: (shareLink) => "mailto:?body=" + encodeURIComponent(shareLink),
  whatsapp: (shareLink) =>
    "https://wa.me/?text=" + encodeURIComponent(shareLink),
};

export function SocialButton({
  type,
  shareLink,
}: SocialButtonProps): JSX.Element {
  const { t } = useTranslation();

  const Icon = ICONS[type];
  const link = LINKS[type];

  return (
    <a
      href={link(shareLink)}
      target="_blank"
      rel="noreferrer"
      className={classes.socialButton}
    >
      <Icon />
      {t(`share.${type}`)}
    </a>
  );
}
