import { expect, test } from "@playwright/test";

test("supports navigation to and from settings", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Settings" }).click();

  const title = page.getByRole("heading", { name: "pathsolver" });
  const settings = page.getByRole("heading", { name: "settings" });
  await expect(title).not.toBeAttached();
  await expect(settings).toBeVisible();
  await expect(page).toHaveURL("/settings");

  await page.getByRole("button", { name: "Back" }).click();
  await expect(title).toBeVisible();
  await expect(settings).not.toBeAttached();
  await expect(page).toHaveURL("/");
});

test.describe("sets default values for user settings", () => {
  test.use({ locale: "de-DE", colorScheme: "dark" });

  test("detects user preferences", async ({ page }) => {
    await page.goto("/");

    // Test locale
    await expect(
      page.getByRole("button", { name: "Einstellungen" })
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "de");

    // Test dark mode
    await expect(page.locator("body")).toHaveClass("theme-dark");
  });
});

test.describe("handles unknown user settings", () => {
  test.use({ locale: "xx-XX", colorScheme: "no-preference" });

  test("uses fallback settings", async ({ page }) => {
    await page.goto("/");

    // Test locale
    await expect(page.getByRole("button", { name: "Settings" })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    // Test light mode
    await expect(page.locator("body")).toHaveClass("theme-light");
  });
});

test.describe("detects touch devices and sets default values accordingly", () => {
  test.use({ hasTouch: true });

  test("hides hover animations and tooltips", async ({ page }) => {
    await page.goto("/settings");

    const checkbox = page.getByRole("checkbox", { name: "Hover Animations" });

    await expect(checkbox).not.toBeChecked();

    await page.getByRole("button", { name: "Next" }).hover();
    await expect(page.getByText("Next")).toBeHidden();

    await checkbox.check();
    await page.getByRole("button", { name: "Next" }).hover();
    await expect(page.getByText("Next")).toBeVisible();
  });
});

test("supports changing settings and persists them", async ({ page }) => {
  await page.goto("/settings");

  const title = page.getByRole("heading", { name: "Settings" });

  const language = page.getByRole("spinbutton");
  await expect(language).toHaveText("English");
  await expect(language).toHaveAttribute("aria-valuetext", "English");

  await language.press("ArrowRight");
  await expect(title).toBeHidden();
  await expect(language).not.toHaveText("English");
  await expect(language).not.toHaveAttribute("aria-valuetext", "English");
  await language.press("ArrowLeft");
  await expect(title).toBeVisible();
  await expect(language).toHaveText("English");

  const light = page.getByLabel("Light");
  const dark = page.getByLabel("Dark");
  await expect(light).toBeChecked();
  await expect(dark).not.toBeChecked();

  await light.press("ArrowRight");
  await expect(dark).toBeChecked();
  await expect(light).not.toBeChecked();
  await expect(page.locator("body")).toHaveClass("theme-dark");

  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  await expect(page.locator("body")).toHaveClass("theme-dark");
  await expect(title).toBeVisible();
});
