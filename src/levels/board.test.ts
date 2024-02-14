import { describe, it, expect } from "vitest";
import prand from "pure-rand";

import { Board } from "./board";
import { Difficulty } from "./difficulty";

describe("Board", () => {
  it("generates a board correctly", () => {
    const board = new Board(Difficulty.hard(), prand.xoroshiro128plus(0));

    expect(board.difficulty).toEqual(Difficulty.hard());

    expect(board.nodes).toHaveLength(9);
    board.nodes.forEach((n) => expect(n).toBeLessThan(10));

    expect(board.edges).toHaveLength(12);
    expect(board.edges).not.toEqual(expect.arrayContaining(["division"]));
  });

  it.each([
    // Horizontal edges
    [0, 1, 0],
    [1, 2, 1],
    [3, 4, 2],
    [4, 5, 3],
    [6, 7, 4],
    [7, 8, 5],
    // Vertical edges
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [4, 7, 10],
    [5, 8, 11],
  ])("it calculates the edge index between %i and %i", (i1, i2, expected) => {
    const board = new Board(Difficulty.hard(), prand.xoroshiro128plus(0));
    expect(board.indexOfEdgeBetween(i1, i2)).toEqual(expected);
  });
});
