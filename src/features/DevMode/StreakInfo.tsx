import { useEffect, useState } from "react";

import { PRESET_DIFFICULTIES } from "~src/level-gen";
import { statsHelpers } from "~src/level-state";
import { useStatisticsStore } from "~src/stores";

import classes from "./StreakInfo.module.css";

export function StreakInfo(): JSX.Element {
  const [streakStates, setStreakStates] = useState<string[][]>([]);

  const stats = useStatisticsStore.use.stats();

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = Date.now();

      const streakStates = PRESET_DIFFICULTIES.map((d) => {
        const { lastPlayedTimestamp, currentStreak } = stats[d];
        const streakState = statsHelpers.getStreakState({
          lastPlayedTimestamp,
          currentStreak,
          timestamp,
        });

        if (streakState.type === "idle") return [d, streakState.type];
        return [d, streakState.type, streakState.expiresInMs.toString()];
      });

      setStreakStates(streakStates);
    }, 100);
    return () => clearInterval(interval);
  }, [stats]);

  return (
    <div className={classes.streakInfo}>
      {streakStates.map((values, i) => (
        <pre key={i}>{values.join(" | ")}</pre>
      ))}
    </div>
  );
}
