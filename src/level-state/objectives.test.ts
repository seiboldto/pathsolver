import { expect, it } from "vitest";

import { type Objective } from "~src/models";

import { getObjectivesState } from "./objectives";

it("calculates objectives state", () => {
  const objectives: Objective[] = Array.from({ length: 3 }, (_, i) => ({
    id: "",
    index: i,
    path: [],
    value: 0,
  }));

  const objectivesState = getObjectivesState({
    activeObjectiveIndex: 1,
    objectives,
    objectivesCount: 3,
  });

  expect(objectivesState).toEqual([
    { ...objectives[0], state: "completed" },
    { ...objectives[1], state: "active" },
    { ...objectives[2], state: "pending" },
  ]);
});
