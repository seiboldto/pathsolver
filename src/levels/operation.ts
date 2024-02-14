import { type GenerationResult, GenerationError } from "./error";

/**
 * Available operations to apply.
 *
 * Note that all operations should have an [arity](https://en.wikipedia.org/wiki/Arity) of two.
 */
export type OperationKind =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";

export class Operation {
  private kind: OperationKind;

  /**
   * Creates a new operation.
   */
  constructor(kind: OperationKind) {
    this.kind = kind;
  }

  /**
   * Applies an operation to two numbers.
   * @param n1 - The first number
   * @param n2 - The second number
   * @returns The result of the operation
   */
  public apply(n1: number, n2: number): GenerationResult<number> {
    let result: number;
    switch (this.kind) {
      case "addition":
        result = n1 + n2;
        break;
      case "subtraction":
        result = n1 - n2;
        break;
      case "multiplication":
        result = n1 * n2;
        break;
      case "division":
        result = Math.trunc(n1 / n2);

        if (result == 0 || n2 === 1)
          return new GenerationError({ id: "invalid-division", n1, n2 });

        break;
    }

    return result;
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("returns an error on division by 1", () => {
    const op = new Operation("division");
    const result = op.apply(1, 1);

    expect(result).toBeInstanceOf(GenerationError);
  });

  it("returns an error on divisions returning less than one", () => {
    const op = new Operation("division");
    const result = op.apply(1, 5);

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
}
