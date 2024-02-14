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
