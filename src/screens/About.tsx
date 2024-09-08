import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Button, Screen, Title } from "~src/components";
import { useNavigation } from "~src/hooks";

export function AboutScreen(): JSX.Element {
  const { t } = useTranslation();

  const { handleMenuNavigation } = useNavigation();

  return (
    <Screen>
      <Title>{t("navigation.about")}</Title>
      <Button icon={IconArrowLeft} onClick={handleMenuNavigation}>
        {t("navigation.back")}
      </Button>
    </Screen>
  );
}
