import { NORMAL_GAME } from "../../fixtures";
import { expect, test } from "./level-assertions";

test("shows tutorial in the first game", async ({ levelPage, page }) => {
  await levelPage.open(NORMAL_GAME);

  const status = page.getByRole("status");

  const { mouse } = page;

  const fourthNode = page.getByRole("button", { name: "Row 2 / Column 1" });
  const fifthNode = page.getByRole("button", { name: "Row 2 / Column 2" });
  const sixthNode = page.getByRole("button", { name: "Row 2 / Column 3" });

  await expect(status).toHaveText(
    "Click and hold a number in the grid to start a path."
  );

  await sixthNode.hover();
  await mouse.down();
  await expect(status).toHaveText(
    "Move to an adjacent number to add it to the path."
  );

  await fifthNode.hover();
  await expect(status).toHaveText(
    "Release your mouse to advance to the next objective."
  );

  await fourthNode.hover();
  await expect(status).toHaveText(
    "Find a path that computes to 12. There may be multiple solutions."
  );

  await mouse.up();
  await expect(status).toHaveText(
    "Click and hold a number in the grid to start a path."
  );

  await sixthNode.hover();
  await mouse.down();
  await fifthNode.hover();
  await mouse.up();

  await expect(status).toHaveText(
    "Solve all remaining objectives. If you're stuck, you can always restart the level."
  );

  await levelPage.selectNodesByCoords(NORMAL_GAME.PERFECT_SELECTION_COORDS[1]);
  await expect(status).toHaveText(
    "Try to get a perfect game by having numbers left over at the end. This may not always be possible."
  );

  await levelPage.selectNodesByCoords(NORMAL_GAME.PERFECT_SELECTION_COORDS[2]);
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
