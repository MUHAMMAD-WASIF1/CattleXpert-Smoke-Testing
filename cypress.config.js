const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    testIsolation: true, // Enable test isolation
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      on('after:screenshot', (details) => {
        console.log(`Screenshot taken: ${details.path}`);
      });
    },
    specPattern: "cypress/e2e/**/*.cy.{js,ts}", // Run all Cypress e2e files
    browser: 'chrome', // Set the default browser to Google Chrome
    baseUrl: 'https://clientdemos.cattlexpert.com/Cattlexpert.UI/login.aspx?ReturnUrl=%2fCattlexpert.UI%2fCxHome.aspx#lnkCxHome', // Set your base URL here
    defaultCommandTimeout: 20000, // Increase to 20 seconds
    pageLoadTimeout: 60000, // Waits up to 60 seconds for page loads
    video: false, // Disable video recording
    screenshotOnRunFailure: true, // Capture screenshots on test failures
    trashAssetsBeforeRuns: true, // Clears old screenshots before a new run
  },
  reporter: 'mochawesome',
  reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true,
},
});
