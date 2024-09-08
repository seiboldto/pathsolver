/// <reference types="vitest" />

import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { githubPagesSPA } from "./vite.pages-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), githubPagesSPA()],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  define: {
    "import.meta.vitest": undefined,
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILT_AT__: Date.now(),
  },
  resolve: {
    alias: {
      "~src": path.resolve(__dirname, "src"),
    },
  },
  test: {
    includeSource: ["src/**/*.ts"],
    exclude: ["node_modules", "dist", "src/__tests__/e2e/**/*"],
    clearMocks: true,
  },
});
