export const VERSIONS = {
  STORAGE: {
    PERSISTED_LEVEL: 1,
    SETTINGS: 1,
    STATISTICS: 1,
  },
  GENERATOR: 1,
  APP_VERSION: __APP_VERSION__,
  BUILT_AT: __BUILT_AT__,
} as const;
