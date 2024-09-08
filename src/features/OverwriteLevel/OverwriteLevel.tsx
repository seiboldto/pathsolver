import { useTranslation } from "react-i18next";

import { Button, Text, Title } from "~src/components";

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
      <Text>{t("overwrite.warning")}</Text>
      <Button onClick={onOverwrite}>{t("overwrite.button")}</Button>
      <Button onClick={onCancel}>{t("navigation.cancel")}</Button>
    </>
  );
}
