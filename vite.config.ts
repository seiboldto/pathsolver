/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.vitest": undefined,
  },
  resolve: {
    alias: {
      "~src": path.resolve(__dirname, "src"),
    },
  },
  test: {
    includeSource: ["src/**/*.ts"],
    exclude: ["node_modules", "dist"],
    clearMocks: true,
  },
});
