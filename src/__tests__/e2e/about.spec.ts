import { expect, test } from "@playwright/test";

test("has an about menu", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "About" }).click();

  await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByRole("heading", { name: "About" })).toBeHidden();
});
