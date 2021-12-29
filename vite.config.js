import { defineConfig } from "vite";
import babel from "vite-babel-plugin";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json";
import path from "path";

const getExternalDeps = () =>
  [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
  ].filter((dep) => dep !== "pdfjs-dist");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), babel()],

  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "vue-mindee-js",
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: getExternalDeps(),
    },
  },
});
