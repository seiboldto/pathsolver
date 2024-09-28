import { describe, expect, it } from "vitest";

import { INITIAL_DIFFICULTY_STATISTICS } from "~src/models";

import { DAY_IN_MILLISECONDS, getStreakState, updateStats } from "./stats";

describe("get streak state", () => {
  it("is idle when no game has been played", () => {
    expect(
      getStreakState({
        timestamp: 0,
        lastPlayedTimestamp: null,
        currentStreak: 0,
      })
    ).toEqual({ type: "idle" });
  });

  it("is idle if there is no current streak", () => {
    expect(
      getStreakState({ timestamp: 0, lastPlayedTimestamp: 0, currentStreak: 0 })
    ).toEqual({ type: "idle" });
  });

  it("is advanced if game happened just now", () => {
    const lastPlayedTimestamp = new Date("2020-01-01T12:00:00.000").valueOf();
    const timestamp = lastPlayedTimestamp;

    expect(
      getStreakState({
        timestamp,
        lastPlayedTimestamp,
        currentStreak: 1,
      })
    ).toEqual({
      type: "advanced",
      expiresInMs: DAY_IN_MILLISECONDS / 2 + DAY_IN_MILLISECONDS,
    });
  });

  it("is advanced if game happened today", () => {
    const lastPlayedTimestamp = new Date("2020-01-01T12:00:00.000").valueOf();
    const timestamp = new Date("2020-01-01T18:00:00.000").valueOf();

    expect(
      getStreakState({ timestamp, lastPlayedTimestamp, currentStreak: 1 })
    ).toEqual({
      type: "advanced",
      expiresInMs: DAY_IN_MILLISECONDS / 4 + DAY_IN_MILLISECONDS,
    });
  });

  it("is advanced if last game happened exactly at midnight today", () => {
    const lastPlayedTimestamp = new Date("2020-01-01T00:00:00.000").valueOf();
    const timestamp = new Date("2020-01-01T00:00:05.000").valueOf();

    expect(
      getStreakState({ timestamp, lastPlayedTimestamp, currentStreak: 1 })
    ).toEqual({
      type: "advanced",
      expiresInMs: 2 * DAY_IN_MILLISECONDS - 5000,
    });
  });

  it("is active if last game happened yesterday", () => {
    const lastPlayedTimestamp = new Date("2020-01-01T12:00:00.000").valueOf();
    const timestamp = new Date("2020-01-02T06:00:00.000").valueOf();

    expect(
      getStreakState({ timestamp, lastPlayedTimestamp, currentStreak: 1 })
    ).toEqual({
      type: "active",
      expiresInMs: (3 * DAY_IN_MILLISECONDS) / 4,
    });
  });

  it("expires immediately if last game happened the day before yesterday", () => {
    const lastPlayedTimestamp = new Date("2020-01-01T12:00:00.000").valueOf();
    const timestamp = new Date("2020-01-03T00:00:00.000").valueOf();

    expect(
      getStreakState({ timestamp, lastPlayedTimestamp, currentStreak: 1 })
    ).toEqual({
      type: "active",
      expiresInMs: 0,
    });
  });
});

describe("update stats", () => {
  it("increments game counters accordingly", () => {
    const timestamp = 0;

    const noPerfectGame = updateStats({
      stats: INITIAL_DIFFICULTY_STATISTICS,
      isPerfectGame: false,
      timestamp,
    });
    expect(noPerfectGame.gamesPlayed).toEqual(1);
    expect(noPerfectGame.perfectGames).toEqual(0);

    const withPerfectGame = updateStats({
      stats: noPerfectGame,
      isPerfectGame: true,
      timestamp,
    });

    expect(withPerfectGame.gamesPlayed).toEqual(2);
    expect(withPerfectGame.perfectGames).toEqual(1);
  });

  it("increments the current streak if it is idle", () => {
    const timestamp = 50;

    const stats = updateStats({
      stats: INITIAL_DIFFICULTY_STATISTICS,
      isPerfectGame: false,
      timestamp,
    });

    expect(stats.currentStreak).toEqual(1);
    expect(stats.maxStreak).toEqual(1);
    expect(stats.lastPlayedTimestamp).toEqual(50);
  });

  it("increments the current streak if it is active", () => {
    const timestamp = DAY_IN_MILLISECONDS;

    const stats = updateStats({
      stats: {
        ...INITIAL_DIFFICULTY_STATISTICS,
        maxStreak: 3,
        currentStreak: 1,
        lastPlayedTimestamp: 0,
      },
      isPerfectGame: false,
      timestamp,
    });

    expect(stats.currentStreak).toEqual(2);
    expect(stats.maxStreak).toEqual(3);
    expect(stats.lastPlayedTimestamp).toEqual(timestamp);
  });

  it("does not increment the current streak if it is already advanced", () => {
    const timestamp = DAY_IN_MILLISECONDS / 2;

    const stats = updateStats({
      stats: {
        ...INITIAL_DIFFICULTY_STATISTICS,
        maxStreak: 3,
        currentStreak: 1,
        lastPlayedTimestamp: 0,
      },
      isPerfectGame: false,
      timestamp,
    });

    expect(stats.currentStreak).toEqual(1);
    expect(stats.maxStreak).toEqual(3);
    expect(stats.lastPlayedTimestamp).toEqual(0);
  });
});
