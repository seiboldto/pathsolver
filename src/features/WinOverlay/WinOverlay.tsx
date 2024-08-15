import { IconHome, IconPlayerPlay } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

import { Button, Group, Overlay, Tooltip } from "~src/components";
import { DifficultyStats } from "~src/features";
import { useActiveLevel, useGenerateLevel } from "~src/hooks";
import { getRandomInt } from "~src/lib";

export function WinOverlay(): JSX.Element | null {
  const { t } = useTranslation();
  const [titleNr] = useState(() => getRandomInt(1, 3));

  const [, setLocation] = useLocation();
  const navigateToHome = () => setLocation("/");

  const { playRandomLevel } = useGenerateLevel();
  const { gameState, level } = useActiveLevel();
  const { difficulty } = level.board;

  const handlePlayAgainClick = () => {
    playRandomLevel(difficulty);
  };

  const title = t(`win.title${titleNr}`);
  const presetDifficulty = level.board.difficulty.options.preset;

  return (
    <Overlay visible={gameState.hasWon} title={title}>
      {presetDifficulty && <DifficultyStats difficulty={presetDifficulty} />}
      <Group>
        <Button icon={IconPlayerPlay} onClick={handlePlayAgainClick}>
          {t("win.play-again")}
        </Button>
        <Tooltip label={t("navigation.home")}>
          <Button square onClick={navigateToHome}>
            <IconHome />
          </Button>
        </Tooltip>
      </Group>
    </Overlay>
  );
}
