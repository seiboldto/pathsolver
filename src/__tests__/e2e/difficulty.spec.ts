import { expect, test } from "@playwright/test";

test("supports navigation to and from difficulty page", async ({ page }) => {
  await page.goto("/");

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
});

test("displays correct difficulty information", async ({ page }) => {
  await page.goto("/difficulty");

  const normal = page.getByLabel("Normal");
  const hard = page.getByLabel("Hard");
  await expect(normal).toBeChecked();

  await expect(page.getByText("Path Count 3")).toBeVisible();
  const addition = page.getByRole("progressbar", { name: "Addition" });
  const subtraction = page.getByRole("progressbar", { name: "Subtraction" });
  await expect(addition).toHaveAttribute("aria-valuetext", "70%");
  await expect(subtraction).toHaveAttribute("aria-valuetext", "30%");

  await normal.press("ArrowRight");
  await expect(hard).toBeChecked();

  await expect(page.getByText("Path Count 3 − 4")).toBeVisible();
  await expect(addition).toHaveAttribute("aria-valuetext", "50%");
  await expect(subtraction).toHaveAttribute("aria-valuetext", "40%");

  // Retains difficulty selection on navigation
  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Play" }).click();
  await expect(hard).toBeChecked();
});
