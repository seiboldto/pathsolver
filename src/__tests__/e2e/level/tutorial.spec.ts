import { NORMAL_GAME } from "../../fixtures";
import { expect, test } from "./level-assertions";

test("shows tutorial in the first game", async ({ levelPage, page }) => {
  await levelPage.open(NORMAL_GAME);

  const status = await page.getByRole("status");

  const { mouse } = page;

  const firstNode = page.getByRole("button", { name: "Row 1 / Column 1" });
  const secondNode = page.getByRole("button", { name: "Row 1 / Column 2" });
  const fourthNode = page.getByRole("button", { name: "Row 2 / Column 1" });
  const fifthNode = page.getByRole("button", { name: "Row 2 / Column 2" });

  await expect(status).toHaveText(
    "Click on a number in the grid to start a path."
  );

  await firstNode.hover();
  await mouse.down();
  await expect(status).toHaveText(
    "Move to an adjacent number to add it to the path."
  );

  await secondNode.hover();
  await expect(status).toHaveText(
    "Release your mouse to advance to the next objective."
  );

  await fifthNode.hover();
  await expect(status).toHaveText(
    "Find a path that computes to 10. There may be multiple solutions."
  );

  await mouse.up();
  await expect(status).toHaveText(
    "Click on a number in the grid to start a path."
  );

  await fourthNode.hover();
  await mouse.down();
  await expect(status).toHaveText(
    "Move to an adjacent number to add it to the path."
  );

  await fifthNode.hover();
  await expect(status).toHaveText(
    "Find a path that computes to 10. There may be multiple solutions."
  );
  await secondNode.hover();
  await expect(status).toHaveText(
    "Release your mouse to advance to the next objective."
  );

  await mouse.up();
  await expect(status).toHaveText(
    "Solve all remaining objectives. If you're stuck, you can always restart the level."
  );

  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[1]);
  await expect(status).toHaveText(
    "Solve all remaining objectives. If you're stuck, you can always restart the level."
  );

  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[2]);
  await expect(status).toBeHidden();
});

test("doesn't show tutorial if it isn't the first game", async ({
  levelPage,
  page,
}) => {
  await levelPage.open(NORMAL_GAME);
  await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);

  await page.getByRole("button", { name: "Play Again" }).click();
  await expect(page.getByRole("status")).toBeHidden();
});
