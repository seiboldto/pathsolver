import { IconHome, IconPlayerPlay } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

import { Button, Group, Overlay, Tooltip } from "~src/components";
import { DifficultyStats } from "~src/features";
import { useActiveLevel, useLevel } from "~src/hooks";
import { getRandomInt } from "~src/lib";

export function WinOverlay(): JSX.Element | null {
  const { t } = useTranslation();
  const [titleNr] = useState(() => getRandomInt(1, 3));

  const [, setLocation] = useLocation();
  const handleMenuNavigation = () => setLocation("/");

  const { playRandomLevel } = useLevel();
  const { gameState, difficultyOptions } = useActiveLevel();

  const handlePlayAgainClick = () => {
    playRandomLevel(difficultyOptions.preset);
  };

  const title = t(`win.title${titleNr}`);

  return (
    <Overlay visible={gameState.hasWon} title={title}>
      <DifficultyStats difficulty={difficultyOptions.preset} />
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
