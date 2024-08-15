import { describe, expect, it } from "vitest";

import { getGameState } from "./game";

const DEFAULT_ARGS = {
  activeObjectiveIndex: 0,
  nodes: [],
  objectivesCount: 3,
};

describe("calculates game state", () => {
  it("is waiting when no moves have been made", () => {
    expect(getGameState(DEFAULT_ARGS)).toEqual({
      state: "waiting",
      hasWon: false,
    });
  });

  it("is playing when the game is not yet won", () => {
    expect(getGameState({ ...DEFAULT_ARGS, activeObjectiveIndex: 1 })).toEqual({
      state: "playing",
      hasWon: false,
    });
  });

  it("is won when all objectives are completed", () => {
    expect(getGameState({ ...DEFAULT_ARGS, activeObjectiveIndex: 3 })).toEqual({
      state: "won",
      hasWon: true,
    });
  });

  it("is perfectly won when all objectives are completed and some nodes are remaining", () => {
    expect(
      getGameState({
        ...DEFAULT_ARGS,
        activeObjectiveIndex: 3,
        nodes: [
          {
            id: "",
            active: true,
            row: 0,
            column: 0,
            value: 0,
          },
        ],
      })
    ).toEqual({
      state: "perfect-won",
      hasWon: true,
    });
  });
});
