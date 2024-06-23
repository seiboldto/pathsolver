import { expect, test } from "@playwright/test";

test("supports difficulty page", async ({ page }) => {
  await page.goto("/");

  // Navigation to and from difficulty page
  await page.getByRole("button", { name: "Play" }).click();

  const pathfinder = page.getByRole("heading", { name: "pathfinder" });
  const difficulty = page.getByRole("heading", { name: "difficulty" });
  await expect(pathfinder).not.toBeAttached();
  await expect(difficulty).toBeVisible();
  await expect(page).toHaveURL("/difficulty");

  await page.getByRole("button", { name: "Back" }).click();
  await expect(pathfinder).toBeVisible();
  await expect(difficulty).not.toBeAttached();
  await expect(page).toHaveURL("/");

  // Difficulty selection
  await page.goto("/difficulty");
  const normal = page.getByLabel("Normal");
  const hard = page.getByLabel("Hard");
  await expect(normal).toBeChecked();

  await normal.press("ArrowRight");
  await expect(hard).toBeChecked();

  // Retains difficulty selection on navigation
  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Play" }).click();
  await expect(hard).toBeChecked();
});
