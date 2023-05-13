import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../../frontendBuild",
  },
  server: {
    port: 7070
  },
});
