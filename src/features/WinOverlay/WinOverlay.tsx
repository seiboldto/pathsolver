import { IconHome, IconPlayerPlay } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

import { Button, Divider, Group, Overlay, Tooltip } from "~src/components";
import { DifficultyStats, ShareLevel } from "~src/features";
import { useActiveLevel, useLevel } from "~src/hooks";
import { getRandomInt } from "~src/lib";

export function WinOverlay(): JSX.Element | null {
  const { t } = useTranslation();
  const [titleNr] = useState(() => getRandomInt(1, 3));

  const [, setLocation] = useLocation();
  const handleMenuNavigation = () => setLocation("/");

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
      <DifficultyStats difficulty={difficultyOptions.preset} />
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
