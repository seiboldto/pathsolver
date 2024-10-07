import { HINT_GAME } from "../../fixtures";
import { expect, test } from "./level-assertions";

// TODO
// The following features are not tested when using hints:
// - Path length display
// - Objective mark

test("supports requesting a hint", async ({ levelPage, page }) => {
  await levelPage.open(HINT_GAME);

  const hint = page.getByText("The 1st objective");

  // Shows hint overlay
  await page.getByRole("button", { name: "Get a Hint" }).click();
  await page
    .getByRole("button", { name: "Get a hint for the active objective" })
    .click();

  // Hides hint button after usage
  await expect(page.getByRole("button", { name: "Get a Hint" })).toBeHidden();
  await expect(hint).toBeVisible();
  await expect(hint).toHaveRole("status");

  // Doesn't show hint message after its objective is completed
  await levelPage.selectNodesByCoords(HINT_GAME.SELECTION_COORDS[0]);
  await expect(hint).toBeHidden();

  // Keeps hint on restart
  await page.getByRole("button", { name: "Restart" }).click();
  await expect(hint).toBeVisible();

  // Keeps hint on reload
  await page.reload();
  await expect(hint).toBeVisible();

  // Doesn't count game stats if a hint was used
  await levelPage.solve(HINT_GAME.SELECTION_COORDS);
  await expect(page.getByText("Games played")).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByText("Games played0")).toBeVisible();
});

test("always keeps highlighted edges", async ({ levelPage, page }) => {
  await levelPage.open(HINT_GAME);

  await levelPage.selectNodesByCoords(HINT_GAME.SELECTION_COORDS[0]);
  await page.getByRole("button", { name: "Get a Hint" }).click();
  await page
    .getByRole("button", { name: "Get a hint for the active objective" })
    .click();

  const hint = page.getByText("The 2nd objective");

  const edge = page.getByLabel(
    "Addition between row 1 / column 1 and row 2 / column 1"
  );
  await page.getByRole("button", { name: "Restart" }).click();

  // Shows hint on an earlier objective#
  await expect(hint).toBeVisible();
  await levelPage.selectNodesByCoords([
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 3],
  ]);

  // Shows highlighted edge even if it is not connected
  await expect(hint).toBeVisible();
  await expect(edge).toBeVisible();
});
