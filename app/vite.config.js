import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
});
