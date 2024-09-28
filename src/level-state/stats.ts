import dayjs from "dayjs";

import { type DifficultyStatistics } from "~src/models";

export const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

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

  const date = dayjs(timestamp);
  const lastPlayedDate = dayjs(lastPlayedTimestamp);

  const nextMidnight = date.startOf("day").add(24, "hours");
  const timeToMidnight = nextMidnight.valueOf() - date.valueOf();

  // If last played day is today,
  // return advanced streak and expires in as time to midnight plus day in milliseconds.
  if (lastPlayedDate.isSame(date, "day")) {
    return {
      type: "advanced",
      expiresInMs: timeToMidnight + DAY_IN_MILLISECONDS,
    };
  }

  // If last played day is yesterday,
  // return active streak and expires in as time to midnight.
  const yesterday = date.subtract(1, "day");
  if (lastPlayedDate.isSame(yesterday, "day")) {
    return { type: "active", expiresInMs: timeToMidnight };
  }

  // If last played day is before yesterday,
  // return active  streak and expires in 0 milliseconds.
  return { type: "active", expiresInMs: 0 };
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
