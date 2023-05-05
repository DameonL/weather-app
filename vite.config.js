import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "./",
  build: {
    outDir: "../dist",
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
});
