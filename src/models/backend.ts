import { type LevelType } from "./level";

type Backend = {
  loadLevel: (levelType: LevelType) => Promise<void>;
};

const tauriBackend: Backend = {
  loadLevel: async (levelType) => {
    return;
  },
};

export const backend = tauriBackend;
