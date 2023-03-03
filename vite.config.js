import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  esbuild: {
    minify: true,
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    lib: {
      name: "Dood",
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es", "umd", "iife"],
    },
  },
});
