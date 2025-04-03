import logindata from '../../../fixtures/logindata.json';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomShortName() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters.charAt(Math.floor(Math.random() * letters.length)) +
         letters.charAt(Math.floor(Math.random() * letters.length));
}

function getRandomADGFactor() {
  const adgFactors = [2.1, 2.5, 2.9, 3.1, 3.5];
  return getRandomElement(adgFactors);
}

describe('should navigate to Cattle Base Weight successfully', () => {
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

    cy.get('#Item_COR48').trigger('mouseover');
    cy.get('#Item_COR49').click();
    cy.get('#Item_COR55').click();
  });

  it('Create a Gender', () => {
    cy.get('#lnkNewGenderInfo > [lang="en"]').click();
    
    // Ensure the dropdown button is visible and click it
    cy.get('.ui-button').should('be.visible').click();

    // Wait for the dropdown options to be available and select a random option
    cy.get('.ui-menu-item', { timeout: 10000 }).should('be.visible').then($options => {
      const randomOption = getRandomElement($options.toArray());
      cy.wrap(randomOption).click();
    });

    // Enter a random short name
    const randomShortName = getRandomShortName();
    cy.get('#txtGenderShortName').type(randomShortName);

    // Enter a random ADG factor
    const randomADGFactor = getRandomADGFactor();
    cy.get('#txtADGFactor').type(randomADGFactor.toString());

    cy.get('#btnSave').click();
  });

  it('Update ADG Factor for a random Gender', () => {
    // Wait for the grid to be visible
    cy.get('#gview_productGridView', { timeout: 10000 }).should('be.visible');
  
    // Ensure the grid has rows
    cy.get('#gview_productGridView tbody tr').should('have.length.greaterThan', 0).then($rows => {
      const randomRow = getRandomElement($rows.toArray());
      cy.wrap(randomRow).click();
    });
  
    // Ensure the ADG Factor input is visible before interacting with it
    cy.get('#txtADGFactor').should('be.visible').then($input => {
      // Make sure the input field is visible
      if ($input.is(':hidden')) {
        cy.get('#someButtonOrElementToMakeInputVisible').click(); // Adjust this line to make the input visible
      }
      cy.get('#txtADGFactor').clear().type(getRandomADGFactor().toString());
    });
  
    // Save the changes
    cy.get('#btnSave').click();
  });
});