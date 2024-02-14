type GenerationErrorKind = {
  id: "invalid-division";
  n1: number;
  n2: number;
};

/**
 * Errors that can occur while generating a level.
 */
export class GenerationError extends Error {
  private kind: GenerationErrorKind;

  constructor(kind: GenerationErrorKind) {
    super();
    this.kind = kind;
    this.message = this.getMessage();
  }

  private getMessage(): string {
    const kind = this.kind;
    switch (kind.id) {
      case "invalid-division":
        return `Division by 1 or resulting in 0 is not allowed in ${kind.n1} / ${kind.n2}`;
    }
  }
}

/**
 * Convencience type for all functions that may fail while generating.
 *
 * Instead of throwing an error, this type should be returned.
 * This makes it easier to see at a glance whether a function can fail.
 */
export type GenerationResult<T> = T extends GenerationError
  ? never
  : T | GenerationError;
