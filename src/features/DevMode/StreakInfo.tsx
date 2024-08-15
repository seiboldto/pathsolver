import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { PRESET_DIFFICULTIES, type PresetDifficulty } from "~src/level-gen";
import { statsHelpers } from "~src/level-state";
import { useStatisticsStore } from "~src/stores";

import classes from "./StreakInfo.module.css";

type StreakStates = Partial<
  Record<PresetDifficulty, ReturnType<(typeof statsHelpers)["getStreakState"]>>
>;

export function StreakInfo(): JSX.Element {
  const { t } = useTranslation();

  const [streakStates, setStreakStates] = useState<StreakStates>({});

  const stats = useStatisticsStore.use.stats();

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = Date.now();

      const streakStates: StreakStates = {};
      PRESET_DIFFICULTIES.forEach((d) => {
        const { lastPlayedTimestamp, currentStreak } = stats[d];
        streakStates[d] = statsHelpers.getStreakState({
          lastPlayedTimestamp,
          currentStreak,
          timestamp,
        });
      });

      setStreakStates(streakStates);
    }, 100);
    return () => clearInterval(interval);
  }, [stats]);

  return (
    <div className={classes.streakInfo}>
      {Object.entries(streakStates).map(([d, state]) => (
        <pre key={d}>
          {t(`home.difficulty-${d}`)} | {state.type}
          {state.type !== "idle" && ` | ${state.expiresInMs}`}
        </pre>
      ))}
    </div>
  );
}
