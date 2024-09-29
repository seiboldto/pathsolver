import { IconHome, IconPlayerPlay } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Divider, Group, Overlay, Tooltip } from "~src/components";
import { DifficultyStats, ShareLevel } from "~src/features";
import { useActiveLevel, useLevel, useNavigation } from "~src/hooks";
import { getRandomInt } from "~src/lib";

export function WinOverlay(): JSX.Element | null {
  const { t } = useTranslation();
  const [titleNr] = useState(() => getRandomInt(1, 3) as 1 | 2 | 3);

  const { handleMenuNavigation } = useNavigation();

  const { playRandomLevel } = useLevel();
  const { gameState, seed, difficultyOptions } = useActiveLevel();

  const handlePlayAgainClick = () => {
    playRandomLevel(difficultyOptions.preset);
  };

  const title = t(`win.title${titleNr}`);

  return (
    <Overlay visible={gameState.hasWon} title={title}>
      <ShareLevel seed={seed} difficultyPreset={difficultyOptions.preset} />
      <Divider />
      <DifficultyStats difficulty={difficultyOptions.preset} showUpdatedStats />
      <Divider />
      <Group>
        <Button icon={IconPlayerPlay} onClick={handlePlayAgainClick}>
          {t("win.play-again")}
        </Button>
        <Tooltip label={t("navigation.menu")}>
          <Button square onClick={handleMenuNavigation}>
            <IconHome />
          </Button>
        </Tooltip>
      </Group>
    </Overlay>
  );
}
