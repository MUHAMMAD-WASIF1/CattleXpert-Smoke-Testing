import user from '../fixtures/logindata.json';
export function login() {
  // Visit the base URL
  cy.visit('/');
  // Clear cookies, localStorage, and sessionStorage
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
  // Reload the page to reset state
  cy.reload();
  // Perform the login steps
  cy.get('#txtUserName').type(user.name);
  cy.get('#txtPassword').type(user.pass);
  cy.get('#btnLogin').click();
  // Wait for the dropdown to be visible and select the feedyard
  cy.get('#ddlFeedyardList', { timeout: 10000 }).should('be.visible').select(user.database);
  cy.get('#btnConnect').click();
  // Verify successful login by checking for a specific element on the dashboard
  cy.get('#fenster-fence', { timeout: 10000 }).should('be.visible');
}