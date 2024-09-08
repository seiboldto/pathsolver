import { NORMAL_GAME } from "../../fixtures";
import { expect, test } from "./level-assertions";

test("increments streak if there is no last game or it was more than 48h ago", async ({
  levelPage,
  page,
}) => {
  await levelPage.open(NORMAL_GAME);
  await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);

  await expect(page.getByText("Current Streak1+1")).toBeVisible();
});

test.describe("increments streak if the last game was between 24h and 48h ago", () => {
  test("with reload", async ({ levelPage, page }) => {
    await page.clock.install();

    await levelPage.open(NORMAL_GAME);
    await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
    await expect(page.getByText("Current Streak1+1")).toBeVisible();

    await page.reload();
    await page.clock.fastForward("12:00:00");

    await levelPage.open(NORMAL_GAME);
    await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
    await expect(
      page.getByText("Current Streak1", { exact: true })
    ).toBeVisible();

    await page.reload();
    await page.clock.fastForward("12:00:00");
    await levelPage.open(NORMAL_GAME);
    await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
    await expect(page.getByText("Current Streak2+1")).toBeVisible();

    await page.clock.fastForward("24:00:00");
    await expect(page.getByText("Current Streak2+1")).toBeVisible();
  });

  test("without reload", async ({ levelPage, page }) => {
    await page.clock.install();

    await levelPage.open(NORMAL_GAME);
    await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
    await expect(page.getByText("Current Streak1+1")).toBeVisible();

    await page.clock.fastForward("12:00:00");

    await levelPage.open(NORMAL_GAME);
    await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
    await expect(
      page.getByText("Current Streak1", { exact: true })
    ).toBeVisible();

    await page.clock.fastForward("12:00:00");
    await levelPage.open(NORMAL_GAME);
    await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
    await expect(page.getByText("Current Streak2+1")).toBeVisible();

    await page.clock.fastForward("24:00:00");
    await expect(page.getByText("Current Streak2+1")).toBeVisible();
  });
});

test.describe("resets streak after 24h of inactivity and allows for new streak", () => {
  test("with reload", async ({ levelPage, page }) => {
    await page.clock.install();

    await levelPage.open(NORMAL_GAME);
    await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
    await expect(page.getByText("Current Streak1+1")).toBeVisible();

    await page.reload();
    await page.clock.fastForward("12:00:00");

    await levelPage.open(NORMAL_GAME);
    await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
    await expect(
      page.getByText("Current Streak1", { exact: true })
    ).toBeVisible();

    await page.reload();
    await page.clock.fastForward("36:00:00");
    await expect(
      page.getByText("Current Streak0", { exact: true })
    ).toBeVisible();

    await levelPage.open(NORMAL_GAME);
    await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
    await expect(page.getByText("Current Streak1+1")).toBeVisible();
  });

  test("without reload", async ({ levelPage, page }) => {
    await page.clock.install();

    await levelPage.open(NORMAL_GAME);
    await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
    await expect(page.getByText("Current Streak1+1")).toBeVisible();

    await page.clock.fastForward("12:00:00");

    await levelPage.open(NORMAL_GAME);
    await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
    await expect(
      page.getByText("Current Streak1", { exact: true })
    ).toBeVisible();

    await page.clock.fastForward("36:00:00");
    await expect(
      page.getByText("Current Streak0", { exact: true })
    ).toBeVisible();

    await levelPage.open(NORMAL_GAME);
    await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
    await expect(page.getByText("Current Streak1+1")).toBeVisible();
  });
});

test("increments max streak accordingly", async ({ levelPage, page }) => {
  await page.clock.install();

  await levelPage.open(NORMAL_GAME);
  await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
  await expect(page.getByText("Current Streak1+1")).toBeVisible();
  await expect(page.getByText("Max Streak1")).toBeVisible();
  await expect(page.getByLabel("New Best")).toBeVisible();

  await page.clock.fastForward("24:00:00");

  await levelPage.open(NORMAL_GAME);
  await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
  await expect(page.getByText("Current Streak2+1")).toBeVisible();
  await expect(page.getByText("Max Streak2")).toBeVisible();
  await expect(page.getByLabel("New Best")).toBeVisible();

  await page.clock.fastForward("48:00:00");
  await expect(
    page.getByText("Current Streak0", { exact: true })
  ).toBeVisible();
  await expect(page.getByText("Max Streak2")).toBeVisible();
  await expect(page.getByLabel("New Best")).toBeHidden();

  await levelPage.open(NORMAL_GAME);
  await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
  await expect(page.getByText("Current Streak1+1")).toBeVisible();
  await expect(page.getByText("Max Streak2")).toBeVisible();
  await expect(page.getByLabel("New Best")).toBeHidden();
});
