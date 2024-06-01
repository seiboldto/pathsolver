import { Trans, useTranslation } from "react-i18next";

import classes from "./StatsValue.module.css";

type StatsValueProps = {
  i18nKey: string;
  values: Record<string, unknown>;
  context?: string;
};
export function StatsValue({
  i18nKey,
  values,
  context,
}: StatsValueProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={classes.statsValue}>
      <Trans t={t} i18nKey={i18nKey} values={values} context={context}>
        <span></span>
      </Trans>
    </div>
  );
}
