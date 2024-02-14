/// <reference types="vitest" />
import { defineConfig } from "vite";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import * as path from "path";

export const paths = {
  "~src": path.resolve(__dirname, "src"),
  "~assets": path.resolve(__dirname, "src", "assets"),
  "~styles": path.resolve(__dirname, "src", "styles"),
  "~components": path.resolve(__dirname, "src", "components"),
  "~stores": path.resolve(__dirname, "src", "stores"),
  "~views": path.resolve(__dirname, "src", "views"),
  "~models": path.resolve(__dirname, "src", "models"),
  "~lib": path.resolve(__dirname, "src", "lib"),
  "~levels": path.resolve(__dirname, "src", "levels"),
};

export default defineConfig({
  plugins: [
    svelte({
      preprocess: [
        sveltePreprocess({
          typescript: true,
        }),
      ],
    }),
  ],

  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  resolve: {
    alias: paths,
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  test: {
    includeSource: ["src/**/*.ts"],
    exclude: ["node_modules"],
    clearMocks: true,
  },
});
