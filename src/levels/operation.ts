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
