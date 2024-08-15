import { type DifficultyStatistics } from "~src/models";

export const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
export const STREAK_TIME_IN_MILLISECONDS = 2 * DAY_IN_MILLISECONDS;

type GetStreakState = Pick<
  DifficultyStatistics,
  "lastPlayedTimestamp" | "currentStreak"
> & {
  timestamp: number;
};

type StreakState =
  | {
      type: "active" | "advanced";
      expiresInMs: number;
    }
  | {
      type: "idle";
    };

export const getStreakState = ({
  lastPlayedTimestamp,
  timestamp,
  currentStreak,
}: GetStreakState): StreakState => {
  if (lastPlayedTimestamp === null) return { type: "idle" };
  if (currentStreak === 0) return { type: "idle" };

  const difference = Math.abs(lastPlayedTimestamp - timestamp);

  const expiresInMs = STREAK_TIME_IN_MILLISECONDS - difference;
  if (difference < DAY_IN_MILLISECONDS)
    return { type: "advanced", expiresInMs };
  if (difference >= STREAK_TIME_IN_MILLISECONDS)
    return { type: "active", expiresInMs: 0 };

  return { type: "active", expiresInMs };
};

type UpdateStats = {
  stats: DifficultyStatistics;
  timestamp: number;
  isPerfectGame: boolean;
};

export const updateStats = ({
  stats,
  timestamp,
  isPerfectGame,
}: UpdateStats): DifficultyStatistics => {
  const gamesPlayed = stats.gamesPlayed + 1;
  const perfectGames = stats.perfectGames + Number(isPerfectGame);

  const streakState = getStreakState({
    lastPlayedTimestamp: stats.lastPlayedTimestamp,
    currentStreak: stats.currentStreak,
    timestamp,
  });
  const currentStreak =
    stats.currentStreak + (streakState.type !== "advanced" ? 1 : 0);
  const maxStreak =
    currentStreak > stats.maxStreak ? currentStreak : stats.maxStreak;

  const lastPlayedTimestamp =
    streakState.type === "advanced" ? stats.lastPlayedTimestamp : timestamp;

  return {
    gamesPlayed,
    perfectGames,
    currentStreak,
    maxStreak,
    lastPlayedTimestamp,
  };
};
