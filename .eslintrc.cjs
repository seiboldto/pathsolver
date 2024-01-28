const { createConfig } = require("eslint-config-galex/dist/createConfig");
const { getDependencies } = require("eslint-config-galex/dist/getDependencies");
const {
  createTypeScriptOverride,
} = require("eslint-config-galex/dist/overrides/typescript");

const dependencies = getDependencies();

const typescriptOverride = createTypeScriptOverride({
  ...dependencies,
  rules: {
    curly: "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "import/order": [
      "warn",
      {
        groups: [
          ["builtin", "external"],
          "internal",
          "unknown",
          ["parent", "sibling"],
          "index",
          "object",
        ],
        pathGroups: [
          {
            pattern: "~/**",
            group: "internal",
          },
        ],
        "newlines-between": "always",
      },
    ],
  },
});

module.exports = createConfig({
  overrides: [
    typescriptOverride,
    {
      parser: "svelte-eslint-parser",
      files: ["*.svelte"],
      rules: { "import/no-mutable-exports": "off" },
    },
  ],
  ignorePatterns: [
    "src/vite-env.d.ts",
    "src-tauri/**/*",
    "**/*vitest.config.ts",
    "vite.config.ts",
  ],
});
