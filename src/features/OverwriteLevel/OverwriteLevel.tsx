import { useTranslation } from "react-i18next";

import { Button, Title } from "~src/components";

type OverwriteLevelProps = {
  onCancel: () => void;
  onOverwrite: () => void;
};

export function OverwriteLevel({
  onCancel,
  onOverwrite,
}: OverwriteLevelProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <Title small>{t("overwrite.title")}</Title>
      {t("overwrite.warning")}
      <Button onClick={onOverwrite}>{t("overwrite.button")}</Button>
      <Button onClick={onCancel}>{t("navigation.cancel")}</Button>
    </>
  );
}
