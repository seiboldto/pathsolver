import { describe, it, expect } from "vitest";
import prand from "pure-rand";

import { Level } from "./level";
import { Difficulty } from "./difficulty";
import { Board } from "./board";

describe("Level", () => {
  it("generates correct levels", () => {
    for (let i = 0; i < 100; i++) {
      const rng = prand.xorshift128plus(i);
      const level = Level.fromDifficulty(Difficulty.normal(), rng);

      if (level instanceof Level) {
        const board = new Board(
          Difficulty.normal(),
          level.board.nodes,
          level.board.edges,
        );
        for (const path of level.paths) {
          const result = board.evaluateIndices(path.indices);
          expect(path.result).toEqual(result);

          board.applyPathAndCompress(path);
        }

        board.simulatedNodes.forEach((n) => expect(n).toEqual(0));
      }
    }
  });
});
