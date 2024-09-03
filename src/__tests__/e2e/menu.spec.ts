import { expect, test } from "@playwright/test";

test("supports selecting difficulties", async ({ page }) => {
  await page.goto("/");

  const play = page.getByRole("button", { name: "Play" });
  const resume = page.getByRole("button", { name: "Resume" });

  const normalNode = page.getByRole("button", { name: "Row 3 / Column 3" });
  const extremeNode = page.getByRole("button", { name: "Row 4 / Column 4" });

  const normal = page.getByLabel("Normal");
  const hard = page.getByLabel("Hard");
  const extreme = page.getByLabel("Extreme");

  await expect(resume).toBeHidden();
  await expect(normal).toBeChecked();
  await normal.press("ArrowRight");
  await expect(hard).toBeChecked();
  await hard.press("ArrowRight");
  await expect(extreme).toBeChecked();

  await play.click();
  await page.waitForURL("/level");
  await expect(normalNode).toBeVisible();
  await expect(extremeNode).toBeVisible();

  await page.getByRole("button", { name: "Menu" }).click();
  await expect(extreme).toBeChecked();
  await expect(resume).toBeVisible();

  await extreme.press("ArrowRight");
  await expect(normal).toBeChecked();
  await expect(resume).toBeHidden();

  await play.click();

  await expect(
    page.getByRole("heading", { name: "Overwrite active level?" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Cancel" }).click();

  await play.click();
  await page.getByRole("button", { name: "Overwrite" }).click();

  await page.waitForURL("/level");
  await expect(normalNode).toBeVisible();
  await expect(extremeNode).toBeHidden();
});
