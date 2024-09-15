import { describe, expect, it } from "vitest";

import type { Objective } from "~src/models";

import { getTutorialState } from "./tutorial";

const objectives: Objective[] = [
  {
    id: "",
    index: 0,
    path: [],
    value: 0,
  },
];

const i18n = {};

describe("get tutorial state", () => {
  it("is on the first step if no action has been taken yet", () => {
    expect(
      getTutorialState({
        activeObjectiveIndex: 0,
        objectives,
        selectionLength: 0,
        selectionValue: null,
      }).step
    ).toEqual({ i18n, id: "0-start-path" });
  });

  it("is on the second step if one node is selected", () => {
    expect(
      getTutorialState({
        activeObjectiveIndex: 0,
        objectives,
        selectionLength: 1,
        selectionValue: 1,
      }).step
    ).toEqual({ i18n, id: "1-extend-path" });
  });

  it("is on the second step even if the selected node matches the objectives value", () => {
    expect(
      getTutorialState({
        activeObjectiveIndex: 0,
        objectives,
        selectionLength: 1,
        selectionValue: 0,
      }).step
    ).toEqual({ i18n, id: "1-extend-path" });
  });

  it("is on the third step if two nodes are selected", () => {
    expect(
      getTutorialState({
        activeObjectiveIndex: 0,
        objectives,
        selectionLength: 2,
        selectionValue: 1,
      }).step
    ).toEqual({ i18n: { value: 0 }, id: "2-find-objective" });
  });

  it("is on the fourth step if at least two selected nodes match the objectives value", () => {
    expect(
      getTutorialState({
        activeObjectiveIndex: 0,
        objectives,
        selectionLength: 2,
        selectionValue: 0,
      }).step
    ).toEqual({ i18n, id: "3-release-path" });
  });

  it("is on the fifth step if the first objective has been solved", () => {
    expect(
      getTutorialState({
        activeObjectiveIndex: 1,
        objectives,
        selectionLength: 0,
        selectionValue: null,
      }).step
    ).toEqual({ i18n, id: "4-solve-objectives" });
  });

  it("is on the sixth step if the second objective has been solved", () => {
    expect(
      getTutorialState({
        activeObjectiveIndex: 2,
        objectives,
        selectionLength: 0,
        selectionValue: null,
      }).step
    ).toEqual({ i18n, id: "5-perfect-game" });
  });
});
