import { NORMAL_GAME } from "../../fixtures";
import { expect, test } from "./level-assertions";

const shareLink = "http://127.0.0.1:5173/share/eagjMSB";
test("creates a share link that can be used to regenerate a level", async ({
  levelPage,
  page,
}) => {
  await levelPage.open(NORMAL_GAME);

  await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);

  await expect(page.getByLabel("Share via Link")).toHaveValue(shareLink);
  await expect(page.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
    "href",
    "https://wa.me/?text=http%3A%2F%2F127.0.0.1%3A5173%2Fshare%2FeagjMSB"
  );
  await expect(page.getByRole("link", { name: "E-Mail" })).toHaveAttribute(
    "href",
    "mailto:?body=http%3A%2F%2F127.0.0.1%3A5173%2Fshare%2FeagjMSB"
  );

  await page.getByRole("button", { name: "Menu" }).click();

  await page.goto(shareLink);
  await expect(levelPage).toHaveObjectives(NORMAL_GAME.OBJECTIVES);
});

test("shows a share button if web share api is supported", async ({
  levelPage,
  page,
}) => {
  let wasWebShareAPICAlled = false;
  await page.exposeFunction(
    "callWebShareAPI",
    () => (wasWebShareAPICAlled = true)
  );
  await page.addInitScript(() => {
    navigator.share = async () => {
      // @ts-expect-error This function will be exposed by Playwright
      callWebShareAPI();
    };
  });

  await levelPage.open(NORMAL_GAME);
  await levelPage.solve(NORMAL_GAME.SELECTION_COORDS);

  await expect(page.getByRole("link", { name: "WhatsApp" })).toBeHidden();
  await expect(page.getByRole("link", { name: "E-Mail" })).toBeHidden();
  await page.getByRole("button", { name: "Share via Social Media" }).click();
  expect(wasWebShareAPICAlled).toBe(true);
});

test("shows a confirm message if an active level already exists", async ({
  levelPage,
  page,
}) => {
  await levelPage.open(NORMAL_GAME);

  await page.getByRole("button", { name: "Share Level" }).click();
  await expect(page.getByLabel("Share via Link")).toHaveValue(shareLink);

  await page.goto("/");
  await page.getByRole("button", { name: "Play" }).click();
  await page.getByRole("button", { name: "Overwrite" }).click();

  await page.goto(shareLink);
  await expect(
    page.getByRole("heading", { name: "Overwrite active game?" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.waitForURL("/");

  await page.goto(shareLink);
  await page.getByRole("button", { name: "Overwrite" }).click();

  await page.waitForURL("/level");
  await expect(levelPage).toHaveObjectives(NORMAL_GAME.OBJECTIVES);
});

test("returns to the active level if it is the same as the shared level", async ({
  levelPage,
  page,
}) => {
  await levelPage.open(NORMAL_GAME);

  await levelPage.selectNodesByCoords(NORMAL_GAME.SELECTION_COORDS[0]);

  await page.goto("/");
  await page.goto(shareLink);

  await page.waitForURL("/level");
  await expect(levelPage).toHaveActiveObjective(2);
});

test("shows an error if the shared link is invalid", async ({ page }) => {
  await page.goto("/share/id");

  await expect(
    page.getByRole("heading", { name: "Unable to load level." })
  ).toBeVisible();
  await expect(
    page.getByText(
      "The provided level appears to be malformed. Please double-check the URL."
    )
  ).toBeVisible();

  await page.getByRole("button", { name: "Menu" }).click();
  await page.waitForURL("/");
});

test("shows an error if the shared level is from a different version", async ({
  page,
}) => {
  await page.goto("/share/eagjMSA");

  await expect(
    page.getByRole("heading", { name: "Unable to load level." })
  ).toBeVisible();
  await expect(
    page.getByText(
      "This level has been generated in an older version and is no longer compatible."
    )
  ).toBeVisible();

  await page.getByRole("button", { name: "Menu" }).click();
  await page.waitForURL("/");
});
