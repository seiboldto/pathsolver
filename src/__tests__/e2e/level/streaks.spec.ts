import { NORMAL_GAME } from "../../fixtures";
import { expect, test } from "./level-assertions";

test("increments and resets streaks with inbetween reloads", async ({
	levelPage,
	page,
}) => {
	await page.clock.install({ time: new Date("2020-01-01T06:00:00Z") });

	// Solve a game
	await levelPage.open(NORMAL_GAME);
	await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
	await expect(page.getByText("Current Daily Streak1+1")).toBeVisible();

	// Forward to 18:00:00 on 2020-01-01
	await page.clock.fastForward("12:00:00");
	await page.reload();

	// Solving another game on the same day doesn't update the streak
	await levelPage.open(NORMAL_GAME);
	await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
	await expect(
		page.getByText("Current Daily Streak1", { exact: true }),
	).toBeVisible();

	// Forward to 01:00:00 on 2020-01-02
	await page.clock.fastForward("07:00:00");
	await page.reload();

	// Solving a game on a new day updates the streak
	await levelPage.open(NORMAL_GAME);
	await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
	await expect(page.getByText("Current Daily Streak2+1")).toBeVisible();

	// Forward to 23:00:00 on 2020-01-3
	await page.clock.fastForward("45:00:00");
	await page.reload();

	await expect(
		page.getByText("Current Daily Streak2", { exact: true }),
	).toBeVisible();

	// Forward to 01:00:00 on 2020-01-04
	await page.clock.fastForward("02:00:00");
	await page.reload();

	await expect(
		page.getByText("Current Daily Streak0", { exact: true }),
	).toBeVisible();
});

test("increments and resets streaks without inbetween reloads", async ({
	levelPage,
	page,
}) => {
	await page.clock.install({ time: new Date("2020-01-01T06:00:00Z") });

	// Solve a game
	await levelPage.open(NORMAL_GAME);
	await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
	await expect(page.getByText("Current Daily Streak1+1")).toBeVisible();

	// Forward to 18:00:00 on 2020-01-01
	await page.clock.fastForward("12:00:00");

	// Solving another game on the same day doesn't update the streak
	await levelPage.open(NORMAL_GAME);
	await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
	await expect(
		page.getByText("Current Daily Streak1", { exact: true }),
	).toBeVisible();

	// Forward to 01:00:00 on 2020-01-02
	await page.clock.fastForward("07:00:00");

	// Solving a game on a new day updates the streak
	await levelPage.open(NORMAL_GAME);
	await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
	await expect(page.getByText("Current Daily Streak2+1")).toBeVisible();

	// Forward to 23:00:00 on 2020-01-3
	await page.clock.fastForward("45:00:00");

	await expect(page.getByText("Current Daily Streak2+1")).toBeVisible();

	// Forward to 01:00:00 on 2020-01-04
	await page.clock.fastForward("02:00:00");

	await expect(
		page.getByText("Current Daily Streak0", { exact: true }),
	).toBeVisible();
});

test("increments max streak accordingly", async ({ levelPage, page }) => {
	await page.clock.install();

	await levelPage.open(NORMAL_GAME);
	await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
	await expect(page.getByText("Current Daily Streak1+1")).toBeVisible();
	await expect(page.getByText("Max Daily Streak1")).toBeVisible();
	await expect(page.getByLabel("New Best")).toBeVisible();

	await page.clock.fastForward("24:00:00");

	await levelPage.open(NORMAL_GAME);
	await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
	await expect(page.getByText("Current Daily Streak2+1")).toBeVisible();
	await expect(page.getByText("Max Daily Streak2")).toBeVisible();
	await expect(page.getByLabel("New Best")).toBeVisible();

	await page.clock.fastForward("48:00:00");
	await expect(
		page.getByText("Current Daily Streak0", { exact: true }),
	).toBeVisible();
	await expect(page.getByText("Max Daily Streak2")).toBeVisible();
	await expect(page.getByLabel("New Best")).toBeHidden();

	await levelPage.open(NORMAL_GAME);
	await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);
	await expect(page.getByText("Current Daily Streak1+1")).toBeVisible();
	await expect(page.getByText("Max Daily Streak2")).toBeVisible();
	await expect(page.getByLabel("New Best")).toBeHidden();
});
