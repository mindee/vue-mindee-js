import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json";
import { resolve } from "path";

const getExternalDeps = () =>
  [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
  ].filter((dep) => dep !== "pdfjs-dist");

export default defineConfig({
  resolve: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
  plugins: [vue(), dts({ insertTypesEntry: true, rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Vue mindee js",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: getExternalDeps(),
    },
  },
});
