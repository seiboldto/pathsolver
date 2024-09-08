import { IconFlame, IconHelpSquare } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Tooltip, Wrap } from "~src/components";
import { type PresetDifficulty } from "~src/level-gen";
import { useSettingsStore, useStatisticsStore } from "~src/stores";

import classes from "./DifficultyStats.module.css";

type DifficultyStatsProps = {
  difficulty: PresetDifficulty;
  showUpdatedStats?: boolean;
};

export function DifficultyStats({
  difficulty,
  showUpdatedStats,
}: DifficultyStatsProps): JSX.Element {
  const { t } = useTranslation();

  const stats = useStatisticsStore.use.stats();
  const updatedStats = useStatisticsStore.use.updatedStats();
  const difficultyStats = stats[difficulty];

  const showUpdate =
    updatedStats !== null &&
    updatedStats.difficulty === difficulty &&
    showUpdatedStats === true;

  return (
    <div className={classes.difficultyStats}>
      <StatItem
        label={t("stats.games-played")}
        updateType="plus-one"
        showUpdate={showUpdate && updatedStats.gamesPlayed}
      >
        {difficultyStats.gamesPlayed}
      </StatItem>
      <StatItem
        label={t("stats.current-streak")}
        updateType="plus-one"
        showUpdate={showUpdate && updatedStats.currentStreak}
      >
        {difficultyStats.currentStreak}
      </StatItem>
      <StatItem
        label={t("stats.max-streak")}
        updateType="new-best"
        showUpdate={showUpdate && updatedStats.maxStreak}
      >
        {difficultyStats.maxStreak}
      </StatItem>
      <StatItem
        label={t("stats.perfect-games")}
        explanation={t("stats.perfect-game-explanation")}
        updateType="plus-one"
        showUpdate={showUpdate && updatedStats.perfectGames}
      >
        {difficultyStats.perfectGames}
      </StatItem>
    </div>
  );
}

type StatItemProps = {
  label: string;
  children: React.ReactNode;
  explanation?: string;
  showUpdate: boolean;
  updateType: "new-best" | "plus-one";
};

function StatItem({
  label,
  children,
  explanation,
  showUpdate,
  updateType,
}: StatItemProps): JSX.Element {
  const { t } = useTranslation();
  const { enableHoverAnimations } = useSettingsStore.use.settings();

  return (
    <p className={classes.statItem}>
      <span>
        {label}
        {explanation && enableHoverAnimations && (
          <Tooltip label={explanation}>
            <IconHelpSquare size={20} />
          </Tooltip>
        )}
      </span>

      <span>
        {children}
        {showUpdate && (
          <Wrap
            component={(c) => (
              <Tooltip label={t("stats.update.new-best")}>{c}</Tooltip>
            )}
            when={updateType === "new-best"}
          >
            <span
              className={classes.badge}
              data-shiny={updateType === "new-best"}
            >
              {updateType === "new-best" && <IconFlame size={16} />}
              {updateType === "plus-one" && t("stats.update.plus-one")}
            </span>
          </Wrap>
        )}
      </span>
    </p>
  );
}
