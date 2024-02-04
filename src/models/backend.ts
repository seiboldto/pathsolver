import { type LevelType } from "./level";

type Backend = {
  loadLevel: (levelType: LevelType) => Promise<void>;
};

const wasmBackend: Backend = {
  loadLevel: async (levelType) => {
    await new Promise<void>((r) => {
      console.log(levelType);
      r();
    });
    return;
  },
};

export const backend = wasmBackend;
