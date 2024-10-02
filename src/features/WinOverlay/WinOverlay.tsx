import { IconHome, IconPlayerPlay } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Button,
  Divider,
  Group,
  Overlay,
  Text,
  Tooltip,
} from "~src/components";
import { DifficultyStats, ShareLevel } from "~src/features";
import { useActiveLevel, useLevel, useNavigation } from "~src/hooks";
import { getRandomInt } from "~src/lib";

export function WinOverlay(): JSX.Element | null {
  const { t } = useTranslation();
  const [titleNr] = useState(() => getRandomInt(1, 3) as 1 | 2 | 3);

  const { handleMenuNavigation } = useNavigation();

  const { playRandomLevel } = useLevel();
  const { hint, gameState, seed, difficultyOptions } = useActiveLevel();

  const handlePlayAgainClick = () => {
    playRandomLevel(difficultyOptions.preset);
  };

  return (
    <Overlay
      visible={gameState.hasWon}
      title={t(`level.win-overlay.title${titleNr}`)}
    >
      <ShareLevel seed={seed} difficultyPreset={difficultyOptions.preset} />
      <Divider />
      {hint ? (
        <Text>{t("level.win-overlay.used-hint-warning")}</Text>
      ) : (
        <DifficultyStats
          difficulty={difficultyOptions.preset}
          showUpdatedStats
        />
      )}
      <Divider />
      <Group>
        <Button icon={IconPlayerPlay} onClick={handlePlayAgainClick}>
          {t("level.win-overlay.play-again")}
        </Button>
        <Tooltip label={t("pages.menu")}>
          <Button square onClick={handleMenuNavigation}>
            <IconHome />
          </Button>
        </Tooltip>
      </Group>
    </Overlay>
  );
}
