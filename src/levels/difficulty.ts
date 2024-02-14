import type { OperationKind } from "./operation";

/** Defines the difficulty of a level.
 *
 * To create a custom difficulty, use the constructor.
 * Otherwise, you can use a predefined preset.
 *
 * | ID      | Board Size | Possible Operations |
 * |---------|------------|---------------------|
 * | Normal  | 3          | + -                 |
 * | Hard    | 3          | + - *               |
 * | Extreme | 4          | + - * /             |
 */
export class Difficulty {
  public boardSize: number;
  public possibleOperations: OperationKind[];

  constructor(boardSize: number, possibleOperations: OperationKind[]) {
    this.boardSize = boardSize;
    this.possibleOperations = possibleOperations;
  }

  static normal() {
    return new Difficulty(3, ["addition", "subtraction"]);
  }

  static hard() {
    return new Difficulty(3, ["addition", "subtraction", "multiplication"]);
  }

  static extreme() {
    return new Difficulty(4, [
      "addition",
      "subtraction",
      "multiplication",
      "division",
    ]);
  }
}
