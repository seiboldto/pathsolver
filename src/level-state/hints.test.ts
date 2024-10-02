import { describe, expect, it } from "vitest";

import { c, e } from "~src/__tests__";
import { type Objective } from "~src/models";

import { getHint } from "./hints";

const edges = [e(0, 0, "h"), e(1, 0, "h"), e(0, 0, "v"), e(0, 1, "v")].map(
  (e) => ({ ...e, id: e.orientation.slice(0, 1) + e.row + "-" + e.column })
);

describe("get hint", () => {
  it.each([
    [0, "h0-0"],
    [1, "v0-1"],
    [2, "h1-0"],
    [3, "h0-0"],
    [4, "v0-1"],
    [-1, "h1-0"],
  ])(
    "returns a valid hint for the objective value %i",
    (value, highlightedEdgeID) => {
      const objective: Objective = {
        id: "id",
        index: 0,
        path: [c(0, 0), c(0, 1), c(1, 1), c(1, 0)],
        value,
      };

      const hint = getHint({ objective, edges });
      expect(hint).toEqual({
        objectiveIndex: 0,
        pathLength: 4,
        highlightedEdgeID,
      });
    }
  );
});
