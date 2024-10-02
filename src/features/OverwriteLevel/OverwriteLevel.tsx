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
      <Title small>{t("features.overwrite-level.title")}</Title>
      <Text>{t("features.overwrite-level.warning")}</Text>
      <Button onClick={onOverwrite}>
        {t("features.overwrite-level.button")}
      </Button>
      <Button onClick={onCancel}>{t("buttons.cancel")}</Button>
    </>
  );
}
