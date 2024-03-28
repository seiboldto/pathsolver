import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Button, Screen, Title } from "~src/components";
import { useRouterStore } from "~src/stores";

export function Settings() {
  const { t } = useTranslation();

  const { navigate } = useRouterStore.use.actions();
  const navigateToHome = () => navigate({ location: "home" });

  return (
    <Screen>
      <Title>{t("settings.title")}</Title>
      <Button icon={IconArrowLeft} onClick={navigateToHome}>
        {t("menu.back")}
      </Button>
    </Screen>
  );
}
