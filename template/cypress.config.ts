import { defineConfig } from "cypress";

export default defineConfig({
  video: false, // disable video recording
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
