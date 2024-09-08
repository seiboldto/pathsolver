import { IconBrandWhatsapp, IconMail, IconShare } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Anchor, Button, Group } from "~src/components";
import { useId, useNavigation } from "~src/hooks";
import { PresetDifficulty } from "~src/level-gen";
import { VERSIONS } from "~src/lib";
import { createShareableID } from "~src/models";

import classes from "./ShareLevel.module.css";

type ShareLevelProps = {
  seed: number;
  difficultyPreset: PresetDifficulty;
};

const generatorVersion = VERSIONS.GENERATOR;

const SOCIAL_LINKS = {
  email: (shareLink: string) => "mailto:?body=" + encodeURIComponent(shareLink),
  whatsapp: (shareLink: string) =>
    "https://wa.me/?text=" + encodeURIComponent(shareLink),
};

export function ShareLevel({
  seed,
  difficultyPreset,
}: ShareLevelProps): JSX.Element {
  const { t } = useTranslation();
  const id = useId("share-link");

  const { createLink } = useNavigation();

  const encodedID = useMemo(
    () => createShareableID({ seed, difficultyPreset, generatorVersion }),
    [seed, difficultyPreset]
  );

  const shareLink = createLink("SHARE", { encodedID });

  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyClick = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(shareLink);
      setHasCopied(true);
    }
  };

  const isNativeShareSupported = "share" in navigator;
  const handleNativeShare = async () =>
    await navigator.share({ title: t("title"), url: shareLink });

  return (
    <div className={classes.shareLevel}>
      <label htmlFor={id}>{t("share.link")}</label>
      <div className={classes.shareLink}>
        <input
          id={id}
          className={classes.shareInput}
          readOnly
          value={shareLink}
        />
        <Button onClick={handleCopyClick}>
          {t(hasCopied ? "share.copied" : "share.copy")}
        </Button>
      </div>
      {isNativeShareSupported ? (
        <Button icon={IconShare} onClick={handleNativeShare}>
          {t("share.social-media")}
        </Button>
      ) : (
        <Group>
          <Anchor
            href={SOCIAL_LINKS.whatsapp(shareLink)}
            icon={IconBrandWhatsapp}
          >
            {t("share.whatsapp")}
          </Anchor>
          <Anchor href={SOCIAL_LINKS.email(shareLink)} icon={IconMail}>
            {t("share.email")}
          </Anchor>
        </Group>
      )}
    </div>
  );
}
