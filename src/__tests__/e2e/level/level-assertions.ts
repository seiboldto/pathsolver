import { expect as baseExpect, test as baseTest } from "@playwright/test";

import { LevelPage } from "./level-page";

export const test = baseTest.extend<{ levelPage: LevelPage }>({
  levelPage: async ({ page }, use) => {
    const levelPage = new LevelPage(page);
    use(levelPage);
  },
});

const PASSED_MATCHER = {
  message: () => "",
  pass: true,
  name: "toHaveNodes",
  expected: [],
  actual: [],
};

export const expect = baseExpect.extend({
  async toHaveNodes(levelPage: LevelPage, expected: (number | null)[]) {
    const boardSize = Math.sqrt(expected.length);
    for (let i = 0; i < expected.length; i++) {
      const row = Math.trunc(i / boardSize) + 1;
      const column = (i % boardSize) + 1;

      const expectedValue = expected[i];
      const node = levelPage.page.getByRole("button", {
        name: `Row ${row} / Column ${column}`,
      });
      if (expectedValue !== null) {
        await expect(node).toBeVisible();
        await expect(node).toHaveText(expectedValue.toString());
      } else {
        await expect(node).toBeHidden();
      }
    }

    return PASSED_MATCHER;
  },

  async toHaveEdges(levelPage: LevelPage, expected: (string | null)[]) {
    // If the board size is a number n, the amount of edges e is equal to 2*n^2 - 2n.
    // Simplifying, we get 0 = n^2 - n - n/2, which can be solved for n via the quadratic formula.
    // As the board size is always positive, the negative branch can be omitted.
    const boardSize = (1 + Math.sqrt(1 + 2 * expected.length)) / 2;
    const horizontalBoardSize = boardSize - 1;

    const edges = expected.map((expectedValue, i, arr) => {
      if (i < arr.length / 2) {
        const row = Math.trunc(i / horizontalBoardSize) + 1;
        const column = (i % horizontalBoardSize) + 1;
        return {
          expectedValue,
          n1: { row, column },
          n2: { row, column: column + 1 },
        };
      }

      const index = i - arr.length / 2;
      const row = Math.trunc(index / boardSize) + 1;
      const column = (index % boardSize) + 1;

      return {
        expectedValue,
        n1: { row, column },
        n2: { row: row + 1, column },
      };
    });

    for (const { expectedValue, n1, n2 } of edges) {
      const edge = levelPage.page.getByLabel(
        `${expectedValue} between row ${n1.row} / column ${n1.column} and row ${n2.row} / column ${n2.column}`
      );

      if (expectedValue !== null) {
        await expect(edge).toBeVisible();
      } else {
        await expect(edge).toBeHidden();
      }
    }

    return PASSED_MATCHER;
  },

  async toHaveActiveObjective(
    levelPage: LevelPage,
    activeObjectiveOrdinal: number
  ) {
    const objectives = await levelPage.page.getByLabel(/.{3} Objective/).all();

    for (let i = 0; i < objectives.length; i++) {
      const objective = objectives[i];

      await expect(objective).toHaveAttribute(
        "aria-current",
        activeObjectiveOrdinal === i + 1 ? "step" : "false"
      );

      if (activeObjectiveOrdinal > i + 1) {
        await expect(objective).toHaveAccessibleDescription(
          "Completed Objective"
        );
      } else if (activeObjectiveOrdinal === i + 1) {
        await expect(objective).toHaveAccessibleDescription("Active Objective");
      } else {
        await expect(objective).toHaveAccessibleDescription(
          "Pending Objective"
        );
      }
    }

    return PASSED_MATCHER;
  },

  async toHaveObjectives(levelPage: LevelPage, objectives: number[]) {
    for (let i = 0; i < objectives.length; i++) {
      const ordinals = ["1st", "2nd", "3rd"];
      const ordinal = ordinals[i] ?? `${i}th`;

      const objective = levelPage.page.getByLabel(`${ordinal} Objective`);
      await expect(objective).toHaveText(objectives[i].toString());
    }

    return PASSED_MATCHER;
  },
});
