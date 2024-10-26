// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 414,
  viewportHeight: 736,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});