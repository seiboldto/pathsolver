import { IconShare } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Group } from "~src/components";
import { useId } from "~src/hooks";
import { PresetDifficulty } from "~src/level-gen";
import { VERSIONS } from "~src/lib";
import { createShareableID } from "~src/models";

import classes from "./ShareLevel.module.css";
import { SocialButton } from "./SocialButton";

type ShareLevelProps = {
  seed: number;
  difficultyPreset: PresetDifficulty;
};

const generatorVersion = VERSIONS.GENERATOR;

const createShareLink = (shareableID: string) =>
  window.location.origin + "/share/" + shareableID;

export function ShareLevel({
  seed,
  difficultyPreset,
}: ShareLevelProps): JSX.Element {
  const { t } = useTranslation();
  const id = useId("share-link");

  const shareableID = useMemo(
    () => createShareableID({ seed, difficultyPreset, generatorVersion }),
    [seed, difficultyPreset]
  );

  const shareLink = createShareLink(shareableID);

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
          <SocialButton shareLink={shareLink} type="whatsapp" />
          <SocialButton shareLink={shareLink} type="email" />
        </Group>
      )}
    </div>
  );
}
