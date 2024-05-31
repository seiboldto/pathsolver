import { expect, test } from "@playwright/test";

test("supports navigation to and from settings", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Settings" }).click();

  const pathfinder = page.getByRole("heading", { name: "pathfinder" });
  const settings = page.getByRole("heading", { name: "settings" });
  await expect(pathfinder).not.toBeAttached();
  await expect(settings).toBeVisible();

  await page.getByRole("button", { name: "Back" }).click();
  await expect(pathfinder).toBeVisible();
  await expect(settings).not.toBeAttached();
});
