type GenerationErrorKind = {
  id: "invalid-division";
  n1: number;
  n2: number;
};

export class GenerationError extends Error {
  private kind: GenerationErrorKind;

  constructor(kind: GenerationErrorKind) {
    super();
    this.kind = kind;
    this.message = this.getMessage(kind);
  }

  private getMessage(kind: GenerationErrorKind): string {
    switch (kind.id) {
      case "invalid-division":
        return `Division by 1 or resulting in 0 is not allowed in ${kind.n1} / ${kind.n2}`;
    }
  }
}
