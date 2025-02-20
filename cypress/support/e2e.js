// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register';
import 'cypress-iframe';

Cypress.Commands.add('uploadFileToIframe', (iframeSelector, inputSelector, filePath) => {
  cy.iframe(iframeSelector).then(($iframe) => {
    cy.wrap($iframe).find(inputSelector).then(($input) => {
      cy.wrap($input).selectFile(filePath, { force: true });
      
    });
  });
});


Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore specific 3rd party library errors and prevent test failure
  if (
    err.message.includes('$ is not defined') ||
    err.message.includes('jquery_lang_js is not defined') ||
    err.message.includes('_view is not defined')
  ) {
    return false
  }
})