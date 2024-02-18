import { describe, it, expect } from "vitest";
import fs from "fs";

import {
  generateRandomLevel,
  generateLevelFromDate,
  createSeedFromNumber,
} from "./generator";
import { Difficulty } from "./difficulty";
import { Level } from "./level";

describe("Level Generator", () => {
  it("generates a completely random level every time", () => {
    const ITERATIONS = 100;
    const generatedLevels = new Set();

    for (let i = 0; i < ITERATIONS; i++) {
      const level = generateRandomLevel(Difficulty.normal());
      expect(level).toBeInstanceOf(Level);
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

  it("generates unique and stable levels for each day", () => {
    const ITERATIONS = 365;
    const START_DATE = new Date("2024-01-01T00:00:00.000Z");

    const generatedLevels = new Set();
    for (let i = 0; i < ITERATIONS; i++) {
      const date = new Date(START_DATE.getTime() + i * 8.64e7);
      const level = generateLevelFromDate(date, Difficulty.normal());
      generatedLevels.add(level);
    }

    expect(generatedLevels.size).toEqual(ITERATIONS);

    const fixture = fs.readFileSync(
      "./src/__tests__/fixtures/dailys.json",
      "utf-8",
    );
    expect(JSON.stringify(Array.from(generatedLevels))).toEqual(fixture);
  });

  it("generates unique seed values for each day", () => {
    const ITERATIONS = 100_000;
    const seeds = new Set();

    for (let i = 0; i < ITERATIONS; i++) {
      seeds.add(createSeedFromNumber(i));
    }

    expect(seeds.size).toEqual(ITERATIONS);
  });
});
