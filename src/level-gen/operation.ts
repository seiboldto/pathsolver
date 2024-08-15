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

export const OPERATION_KINDS = [
  "addition",
  "subtraction",
  "multiplication",
  "division",
] as const satisfies OperationKind[];

export class Operation {
  public kind: OperationKind;

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
  public apply(n1: number, n2: number): number {
    switch (this.kind) {
      case "addition":
        return n1 + n2;

      case "subtraction":
        return n1 - n2;

      case "multiplication":
        return n1 * n2;

      case "division":
        return Math.trunc(n1 / n2);
    }
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

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
