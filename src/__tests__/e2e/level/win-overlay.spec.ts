import { NORMAL_GAME } from "../../fixtures";
import { expect, test } from "./level-assertions";

test("increments games played after win", async ({ levelPage, page }) => {
  await levelPage.open(NORMAL_GAME);
  await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);

  await expect(page.getByText("Games played1")).toBeVisible();
  await expect(page.getByText("Perfect Games0")).toBeVisible();

  await page.reload();
  await page.waitForURL("/");

  await expect(page.getByText("Games played1")).toBeVisible();
});

test("increments perfect games after win", async ({ levelPage, page }) => {
  await levelPage.open(NORMAL_GAME);

  await levelPage.selectNodesByCoords(NORMAL_GAME.PERFECT_SELECTION_COORDS[0]);
  await levelPage.selectNodesByCoords(NORMAL_GAME.PERFECT_SELECTION_COORDS[1]);
  await levelPage.selectNodesByCoords(NORMAL_GAME.PERFECT_SELECTION_COORDS[2]);

  await expect(page.getByText("Games played1")).toBeVisible();
  await expect(page.getByText("Perfect Games1")).toBeVisible();
});
