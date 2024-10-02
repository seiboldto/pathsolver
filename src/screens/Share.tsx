import { IconHome } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Screen, Text, Title } from "~src/components";
import { OverwriteLevel } from "~src/features";
import { useLevel, useNavigation } from "~src/hooks";
import { VERSIONS } from "~src/lib";
import { parseShareableID } from "~src/models";

type ShareScreenProps = {
  encodedID: string;
};

const expectedGeneratorVersion = VERSIONS.GENERATOR;

type ShareError = "unknown" | "invalid-generator-version";

export function ShareScreen({ encodedID }: ShareScreenProps) {
  const [shareError, setShareError] = useState<ShareError | null>(null);
  const { t } = useTranslation();

  const {
    persistedLevelDifficulty,
    persistedLevelSeed,
    playPersistedLevel,
    playSharedLevel,
  } = useLevel();

  const { handleMenuNavigation } = useNavigation();

  if (shareError === null) {
    const parseResult = parseShareableID({
      encodedID,
      expectedGeneratorVersion,
    });

    if (parseResult.status === "success") {
      const { seed, difficultyPreset } = parseResult.sharedLevel;
      const handlePlay = () => {
        playSharedLevel(seed, difficultyPreset);
      };

      if (persistedLevelDifficulty !== null) {
        if (
          persistedLevelDifficulty === difficultyPreset &&
          persistedLevelSeed === seed
        ) {
          playPersistedLevel();
          return null;
        }

        return (
          <Screen>
            <OverwriteLevel
              onCancel={handleMenuNavigation}
              onOverwrite={handlePlay}
            />
          </Screen>
        );
      }

      handlePlay();
      return null;
    } else if (parseResult.status === "error") {
      const isWrongGenerator =
        parseResult.reason === "invalid-generator-version";
      setShareError(isWrongGenerator ? "invalid-generator-version" : "unknown");
    }

    return null;
  }

  return (
    <Screen>
      <Title small>{t("level.share.load-errors.title")}</Title>
      <Text>{t(`level.share.load-errors.${shareError}`)}</Text>
      <Button onClick={handleMenuNavigation} icon={IconHome}>
        {t("pages.menu")}
      </Button>
    </Screen>
  );
}
