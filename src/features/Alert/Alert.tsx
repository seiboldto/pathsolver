import { Icon, IconAlertCircle, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useTranslation } from "react-i18next";

import { useId } from "~src/hooks";

import classes from "./Alert.module.css";
import { type Alert, useAlert } from "./use-alert";

const ICONS: Record<
  Alert["type"],
  ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
> = { warning: IconAlertCircle };
export function Alert(): JSX.Element | null {
  const { t } = useTranslation();
  const alert = useAlert();
  const id = useId("alert-body");

  if (alert === null) return null;

  const Icon = ICONS[alert.type];

  return (
    <div
      className={classes.alert}
      data-type={alert.type}
      role="alert"
      aria-label={t(`game.alerts.${alert.type}`)}
      aria-describedby={id}
    >
      <Icon size={30} />
      <div id={id}>{t(`game.alerts.${alert.id}`)}</div>
    </div>
  );
}
