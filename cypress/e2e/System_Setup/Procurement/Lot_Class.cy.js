import logindata from '../../../fixtures/logindata.json';
import 'cypress-xpath';
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe('should be navigate to the Lot Class', () => {
  beforeEach(() => {
    cy.visit('/Login.aspx');

    // Clear cookies, localStorage, and sessionStorage
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });

    // Reload the page to reset state
    cy.reload();

    cy.get('#txtUserName').type(logindata.name);
    cy.get('#txtPassword').type(logindata.pass);
    cy.get('#btnLogin').click();
    cy.get('#ddlFeedyardList').select(logindata.database);
    cy.get('#btnConnect').click();

    // Hover over the System Setup click on the Procurement and navigate to Program
    cy.get('#Item_COR48').click();
    cy.xpath('/html/body/form/section[1]/nav/ul/li[11]/ul/li[15]/a').click();
    cy.contains('Lot Class').click();
  });

  it('Create a new lot class', () => {
    const randomDescription = `Description_${Math.random().toString(36).substring(2, 10)}`;
    const randomShortName = `SN_${Math.random().toString(36).substring(2, 5)}`;
    const adgFactors = [2.3, 2.5, 2.7, 3.1, 3.8];
    const randomAdgFactor = adgFactors[Math.floor(Math.random() * adgFactors.length)];

    cy.get('#lnkNewLotClass > [lang="en"]').click();
    cy.get('#txtLotClassDesc').type(randomDescription);
    cy.get('#txtShortName').type(randomShortName);
    cy.get('#txtAdgFactor').type(randomAdgFactor.toString());
    cy.get('#btnSave').click();
    cy.reload();
    cy.get('#rdbShowAll').check();
  });

  it('Update an existing lot class', () => {
    // Select a random lot class from the grid
    cy.get('#rdbShowAll').check();
    cy.get('table tbody tr').then(rows => {
      const randomRow = rows[Math.floor(Math.random() * rows.length)];
      cy.wrap(randomRow).find('td').first().click();
    });

    // Update the selected lot class
    const updatedDescription = `Updated_${Math.random().toString(36).substring(2, 10)}`;
    const updatedShortName = `USN_${Math.random().toString(36).substring(2, 5)}`;
    const adgFactors = [2.3, 2.5, 2.7, 3.1, 3.8];
    const updatedAdgFactor = adgFactors[Math.floor(Math.random() * adgFactors.length)];

    cy.get('#txtLotClassDesc').clear().type(updatedDescription);
    cy.get('#txtShortName').clear().type(updatedShortName);
    cy.get('#txtAdgFactor').clear().type(updatedAdgFactor.toString());
    cy.get('#btnSave').click();
    cy.reload();
    cy.get('#rdbShowAll').check();});
});