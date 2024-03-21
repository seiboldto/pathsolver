import { describe, expect, it } from "vitest";

import { Operation, type OperationKind } from "./operation";
import { GenerationError } from "./error";

describe("Arithmetic Operations", () => {
  it("returns an error on division by 1", () => {
    const op = new Operation("division");
    const result = op.apply(1, 1);

    expect(result).toBeInstanceOf(GenerationError);
  });

  it.each<{ kind: OperationKind; n1: number; n2: number; expected: number }>([
    { kind: "addition", n1: 5, n2: 1, expected: 6 },
    { kind: "subtraction", n1: 5, n2: 1, expected: 4 },
    { kind: "multiplication", n1: 5, n2: 2, expected: 10 },
    { kind: "division", n1: 5, n2: 2, expected: 2 },
  ])("applies operation $kind correctly", ({ kind, n1, n2, expected }) => {
    const op = new Operation(kind);
    const result = op.apply(n1, n2);
    expect(result).toEqual(expected);
  });
});
