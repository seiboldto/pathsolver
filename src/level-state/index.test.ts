import { expect, it } from "vitest";

import { createLevelFunc } from "./index";

it("creates a level function correctly", () => {
  const add = ({ a, b }: { a: number; b: number }) => a + b;

  const curriedAdd = createLevelFunc(add, { a: 3 });

  expect(curriedAdd({ b: 4 })).toEqual(7);
});
