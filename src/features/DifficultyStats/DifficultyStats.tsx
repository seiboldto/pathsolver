import { useTranslation } from "react-i18next";

import { type PresetDifficulty } from "~src/levels";
import { useStatisticsStore } from "~src/stores";

import classes from "./DifficultyStats.module.css";

type DifficultyStatsProps = {
  difficulty: PresetDifficulty;
};

export function DifficultyStats({
  difficulty,
}: DifficultyStatsProps): JSX.Element {
  const { t } = useTranslation();

  const stats = useStatisticsStore.use.stats();
  const difficultyStats = stats[difficulty];

  return (
    <div className={classes.difficultyStats}>
      <StatItem label={t("stats.games-played")}>
        {difficultyStats.gamesPlayed}
      </StatItem>
      <StatItem label={t("stats.current-streak")}>
        {difficultyStats.currentStreak}
      </StatItem>
      <StatItem label={t("stats.max-streak")}>
        {difficultyStats.maxStreak}
      </StatItem>
      <StatItem label={t("stats.best-time")}>
        {difficultyStats.bestTime ?? t("stats.not-applicable")}
      </StatItem>
    </div>
  );
}

type StatItemProps = {
  label: string;
  children: React.ReactNode;
};

function StatItem({ label, children }: StatItemProps): JSX.Element {
  return (
    <p className={classes.statItem}>
      {label}
      <span>{children}</span>
    </p>
  );
}
