import {
  generateRandomSeed,
  PRESET_DIFFICULTIES,
  type PresetDifficulty,
  SEED_LENGTH,
} from "~src/level-gen";
import { base62, getRandomInt } from "~src/lib";

type SharedLevel = {
  seed: number;
  difficultyPreset: PresetDifficulty;
  generatorVersion: number;
};

export const createShareableID = ({
  seed,
  difficultyPreset,
  generatorVersion,
}: SharedLevel): string => {
  const difficultyPresetIndex = PRESET_DIFFICULTIES.findIndex(
    (p) => p === difficultyPreset
  );

  // Note that the difficulty preset index is limited to being one digit, while the generator version can be infinitely long.
  const generatorVersionPaddingCount =
    Math.max(Math.floor(Math.log10(generatorVersion)), 0) + 1;
  const paddingCount = 1 + generatorVersionPaddingCount;

  const shareableID =
    seed * Math.pow(10, paddingCount) +
    difficultyPresetIndex * Math.pow(10, paddingCount - 1) +
    generatorVersion;

  return base62.encode(shareableID);
};

type ParseShareableID = {
  encodedID: string;
  expectedGeneratorVersion: number;
};

type ParseResult =
  | {
      status: "success";
      sharedLevel: SharedLevel;
    }
  | {
      status: "error";
      reason:
        | "too-short"
        | "invalid-charset"
        | "invalid-difficulty"
        | "invalid-generator-version";
    };

export const parseShareableID = ({
  encodedID,
  expectedGeneratorVersion,
}: ParseShareableID): ParseResult => {
  let shareableID: number | string = base62.decode(encodedID);
  if (isNaN(shareableID)) return { status: "error", reason: "invalid-charset" };

  shareableID = shareableID.toString();

  const minimumLength = SEED_LENGTH + 2;

  if (shareableID.length < minimumLength)
    return { status: "error", reason: "too-short" };

  const seed = parseInt(shareableID.slice(0, SEED_LENGTH));

  const difficultyPresetIndex = parseInt(shareableID[SEED_LENGTH]);
  if (difficultyPresetIndex >= PRESET_DIFFICULTIES.length)
    return { status: "error", reason: "invalid-difficulty" };

  const difficultyPreset = PRESET_DIFFICULTIES[difficultyPresetIndex];
  const generatorVersion = parseInt(shareableID.slice(SEED_LENGTH + 1));

  if (generatorVersion !== expectedGeneratorVersion)
    return { status: "error", reason: "invalid-generator-version" };

  return {
    status: "success",
    sharedLevel: { seed, difficultyPreset, generatorVersion },
  };
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("creates and parses shareable ids", () => {
    const ITERATIONS = 10000;
    const generatorVersion = 0;

    for (let i = 0; i < ITERATIONS; i++) {
      const difficultyPreset =
        PRESET_DIFFICULTIES[getRandomInt(0, PRESET_DIFFICULTIES.length - 1)];
      const seed = generateRandomSeed();
      const encodedID = createShareableID({
        seed,
        difficultyPreset,
        generatorVersion,
      });

      const sharedLevel = parseShareableID({
        encodedID,
        expectedGeneratorVersion: generatorVersion,
      });
      expect(sharedLevel).toEqual({
        status: "success",
        sharedLevel: {
          seed,
          difficultyPreset,
          generatorVersion,
        },
      });
    }
  });

  it("supports longer generator versions", () => {
    const difficultyPreset = "hard";
    const generatorVersion = 99;

    const seed = generateRandomSeed();
    const encodedID = createShareableID({
      seed,
      difficultyPreset,
      generatorVersion,
    });
    const sharedLevel = parseShareableID({
      encodedID,
      expectedGeneratorVersion: generatorVersion,
    });
    expect(sharedLevel).toEqual({
      status: "success",
      sharedLevel: { seed, difficultyPreset, generatorVersion },
    });
  });

  const expectedGeneratorVersion = 1;

  it("returns an error if shareable id is too short", () => {
    expect(
      parseShareableID({
        encodedID: base62.encode(123456789),
        expectedGeneratorVersion,
      })
    ).toEqual({ status: "error", reason: "too-short" });
  });

  it("returns an error if shareable id includes non-digit characters", () => {
    expect(
      parseShareableID({
        encodedID: "-1234567891011",
        expectedGeneratorVersion,
      })
    ).toEqual({ status: "error", reason: "invalid-charset" });
  });

  it("returns an error if difficulty preset index is too large", () => {
    expect(
      parseShareableID({
        encodedID: base62.encode(123456789030),
        expectedGeneratorVersion,
      })
    ).toEqual({ status: "error", reason: "invalid-difficulty" });
  });

  it("returns an error if generator version is outdated", () => {
    expect(
      parseShareableID({
        encodedID: base62.encode(123456789000),
        expectedGeneratorVersion,
      })
    ).toEqual({ status: "error", reason: "invalid-generator-version" });
  });
}
