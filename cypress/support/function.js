import user from '../fixtures/users.json'
 
 // LOGIN
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

  // Select the feedyard and connect
  cy.get('#ddlFeedyardList').select(user.database);
  cy.get('#btnConnect').click();
}

//RANDOM STRING
export function getRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

//RANDOM NUMBERS
export function getRandomNumbers(length) {
  const characters = '123456789';
  return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}
