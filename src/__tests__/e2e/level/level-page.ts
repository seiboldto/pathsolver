import { type Page } from "@playwright/test";

import { type LevelFixture } from "../../fixtures";

export class LevelPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(fixture: LevelFixture) {
    await this.page.goto("/");
    await this.page.evaluate(
      (level) => localStorage.setItem("persisted-level", level),
      fixture.LEVEL
    );
    await this.page.goto("/level");
  }

  async selectNodesByCoords(coords: [number, number][]) {
    const nodes = coords.map(([r, c]) =>
      this.page.getByRole("button", { name: `Row ${r} / Column ${c}` })
    );
    if (nodes.length === 0) return;

    const { mouse } = this.page;
    await nodes[0].hover();
    await mouse.down();

    for (const node of nodes) {
      await node.hover();
    }

    await mouse.up();
  }

  async solve(selectionCoords: LevelFixture["SELECTION_COORDS"]) {
    for (const s of selectionCoords) {
      await this.selectNodesByCoords(s);
    }
  }
}
