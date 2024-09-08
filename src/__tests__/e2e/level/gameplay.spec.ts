import { NORMAL_GAME } from "../../fixtures";
import { expect, test } from "./level-assertions";

test("supports playing a game", async ({ levelPage, page }) => {
  await levelPage.open(NORMAL_GAME);

  await expect(levelPage).toHaveObjectives(NORMAL_GAME.OBJECTIVES);
  await expect(levelPage).toHaveActiveObjective(1);

  await expect(levelPage).toHaveNodes(NORMAL_GAME.NODES[0]);
  await expect(levelPage).toHaveEdges(NORMAL_GAME.EDGES[0]);

  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[0]);
  await expect(levelPage).toHaveActiveObjective(2);
  await expect(levelPage).toHaveNodes(NORMAL_GAME.NODES[1]);
  await expect(levelPage).toHaveEdges(NORMAL_GAME.EDGES[1]);

  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[1]);
  await expect(levelPage).toHaveActiveObjective(3);
  await expect(levelPage).toHaveNodes(NORMAL_GAME.NODES[2]);
  await expect(levelPage).toHaveEdges(NORMAL_GAME.EDGES[2]);

  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[2]);

  await expect(page.getByRole("group", { name: "Objectives" })).toBeHidden();
  await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
});

test("has restart and undo buttons", async ({ levelPage, page }) => {
  await levelPage.open(NORMAL_GAME);

  const restart = page.getByRole("button", { name: "Restart" });
  const undo = page.getByRole("button", { name: "Undo" });

  await expect(restart).toBeDisabled();
  await expect(undo).toBeDisabled();

  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[0]);
  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[1]);
  await expect(restart).not.toBeDisabled();
  await expect(undo).not.toBeDisabled();

  await undo.click();
  await expect(levelPage).toHaveNodes(NORMAL_GAME.NODES[1]);
  await expect(levelPage).toHaveActiveObjective(2);
  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[1]);

  await restart.click();
  await expect(levelPage).toHaveNodes(NORMAL_GAME.NODES[0]);
  await expect(levelPage).toHaveActiveObjective(1);
  await expect(restart).toBeDisabled();
  await expect(undo).toBeDisabled();

  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[0]);
  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[1]);

  await page.reload();
  await undo.click();
  await expect(levelPage).toHaveNodes(NORMAL_GAME.NODES[1]);

  await page.reload();
  await restart.click();
  await expect(levelPage).toHaveNodes(NORMAL_GAME.NODES[0]);
  await expect(restart).toBeDisabled();
  await expect(undo).toBeDisabled();

  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[0]);
  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[1]);
  await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("button", { name: "Resume" }).click();

  await undo.click();
  await expect(levelPage).toHaveNodes(NORMAL_GAME.NODES[1]);

  await restart.click();
  await expect(levelPage).toHaveNodes(NORMAL_GAME.NODES[0]);
  await expect(restart).toBeDisabled();
  await expect(undo).toBeDisabled();
});

test("shows selection information", async ({ levelPage, page }) => {
  await levelPage.open(NORMAL_GAME);

  const { mouse } = page;

  const firstNode = page.getByRole("button", { name: "Row 1 / Column 1" });
  const secondNode = page.getByRole("button", { name: "Row 1 / Column 2" });
  const fourthNode = page.getByRole("button", { name: "Row 2 / Column 1" });

  const selectedValue = page.getByLabel("Selected Value");
  await expect(selectedValue).toBeHidden();

  await firstNode.hover();
  await mouse.down();
  await expect(selectedValue).toHaveText("6");
  await mouse.up();
  await expect(selectedValue).toBeHidden();

  await firstNode.hover();
  await mouse.down();
  await secondNode.hover();
  await expect(selectedValue).toHaveText("10");

  await fourthNode.hover();
  await expect(selectedValue).toHaveText("10");
  await mouse.up();
  await expect(selectedValue).toBeHidden();
});

test("increases node size on touch devices", async ({ levelPage, page }) => {
  await page.addInitScript(() => {
    window.ontouchstart = () => {};
  });

  await levelPage.open(NORMAL_GAME);

  const { x, y, width, height } = (await page
    .getByRole("button", { name: "Row 1 / Column 1" })
    .boundingBox())!;

  const { mouse } = page;
  await mouse.move(x + width + 3, y + height + 3);
  await mouse.down();

  await expect(page.getByLabel("Selected Value")).toHaveText("6");
});
