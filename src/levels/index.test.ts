import fs from "fs";
import path from "path";
import { expect, it } from "vitest";

import DAILYS_FIXTURE from "../__tests__/fixtures/dailys.json";
import {
  Difficulty,
  generateLevelFromDate,
  generateRandomLevel,
  type Level,
} from ".";

it("generates a completely random level every time", () => {
  const ITERATIONS = 100;
  const generatedLevels = new Set();

  for (let i = 0; i < ITERATIONS; i++) {
    const level = generateRandomLevel(Difficulty.normal());
    generatedLevels.add(level);
  }

  expect(generatedLevels.size).toEqual(ITERATIONS);
});

it("generates the same level for different dates on the same day", () => {
  const date = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const level = generateLevelFromDate(date, Difficulty.normal());

  for (let h = 1; h < 24; h++) {
    for (let m = 0; m < 60; m++) {
      const newDate = new Date(date.setUTCHours(h, m, 0, 0));
      const newLevel = generateLevelFromDate(newDate, Difficulty.normal());
      expect(newLevel).toEqual(level);
    }
  }
});

it("generates unique and stable levels for each day", async () => {
  const ITERATIONS = 365;
  const START_DATE = new Date("2024-01-01T00:00:00.000Z");

  const generatedLevels = new Set<Level>();
  for (let i = 0; i < ITERATIONS; i++) {
    const date = new Date(START_DATE.getTime() + i * 8.64e7);
    const level = generateLevelFromDate(date, Difficulty.normal());
    generatedLevels.add(level);
  }

  // const shouldUpdateSnapshot = true;
  const shouldUpdateSnapshot = false;
  if (shouldUpdateSnapshot) {
    fs.writeFileSync(
      path.join(__dirname, "..", "__tests__", "fixtures", "dailys.json"),
      JSON.stringify(Array.from(generatedLevels))
    );
    expect(true).toEqual(false);
  } else {
    expect(generatedLevels.size).toEqual(ITERATIONS);

    for (const [i, level] of Array.from(generatedLevels).entries()) {
      expect(level).toEqual(DAILYS_FIXTURE[i]);
    }
  }
});
