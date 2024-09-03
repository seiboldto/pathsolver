import { generateRandomSeed } from "~src/level-gen";

const charset =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const BASE = charset.length;

const encode = (number: number): string => {
  if (number === 0) return charset[0];

  let encoded = "";

  while (number > 0) {
    const remainder = number % BASE;
    encoded = charset[remainder] + encoded;
    number = Math.floor(number / BASE);
  }

  return encoded;
};

const decode = (string: string): number => {
  let decoded = 0;

  for (const char of string) {
    const value = charset.indexOf(char);
    if (value === -1) return NaN;

    decoded = decoded * BASE + value;
  }

  return decoded;
};

export const base62 = { encode, decode };

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("encodes and decodes numbers correctly", () => {
    const ITERATIONS = 10000;
    for (let i = 0; i < ITERATIONS; i++) {
      const number = generateRandomSeed();

      const encoded = encode(number);
      const decoded = decode(encoded);

      expect(decoded).toEqual(number);
    }
  });

  it("returns not a number for invalid strings", () => {
    expect(decode("-")).toBeNaN();
  });
}
