import { IconArrowLeft, IconBrandGithub } from "@tabler/icons-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Anchor, Button, Screen, Text, Title } from "~src/components";
import { useNavigation } from "~src/hooks";
import { VERSIONS } from "~src/lib";

const LINKS = {
  GITHUB: "https://github.com/seiboldto/pathsolver",
};

const BUILT_AT = new Date(VERSIONS.BUILT_AT).toISOString().slice(0, 10);

export function AboutScreen(): JSX.Element {
  const { t } = useTranslation();

  const { handleMenuNavigation } = useNavigation();

  const YEAR = useMemo(() => new Date().toISOString().slice(0, 4), [])

  return (
    <Screen>
      <Title>{t("pages.about")}</Title>
      <Text>{t("about.made-by")}</Text>
      <Anchor href={LINKS.GITHUB} icon={IconBrandGithub}>
        {t("about.source-code")}
      </Anchor>
      <Text dimmed>
        {t("about.version", {
          year: YEAR,
          version: VERSIONS.APP_VERSION,
          date: BUILT_AT,
        })}
      </Text>
      <Button icon={IconArrowLeft} onClick={handleMenuNavigation}>
        {t("buttons.back")}
      </Button>
    </Screen>
  );
}
