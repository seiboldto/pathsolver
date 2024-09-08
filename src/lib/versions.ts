export const VERSIONS = {
  STORAGE: {
    PERSISTED_LEVEL: 0,
    SETTINGS: 0,
    STATISTICS: 0,
  },
  GENERATOR: 1,
  APP_VERSION: __APP_VERSION__,
  BUILT_AT: __BUILT_AT__,
} as const;
