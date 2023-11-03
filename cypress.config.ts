import { defineConfig } from "cypress";
import { addMatchImageSnapshotPlugin } from "cypress-image-snapshot/plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig as defineViteConfig } from "vite";

export default defineConfig({
  viewportWidth: 1500,
  viewportHeight: 900,
  video: false,
  screenshotOnRunFailure: false,

  retries: {
    runMode: 3,
    openMode: 0,
  },

  component: {
    setupNodeEvents(on, config) {

      addMatchImageSnapshotPlugin(on, config);

      return config;
    },
    specPattern: "**/*.spec.{js,ts,jsx,tsx}",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
