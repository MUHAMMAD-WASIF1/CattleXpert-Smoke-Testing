import 'cypress-xpath';
import example from '../../fixtures/example.json';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined') || err.message.includes('OutWeight.toFixed is not a function')) {
    return false;
  }
});

describe('Cattle Contract - Create and Save', () => {
  // beforeEach block will execute before every test case
  it('Verify that the owner can view their Lot Status in the middle of Projection', () => {
    // Visit the login page
    cy.visit('/Login.aspx');

    // Clear cookies, localStorage, and sessionStorage
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => win.sessionStorage.clear());

    // Reload the page to reset state
    cy.reload();

    // Select Public User
    cy.get('#rbLoginType_0').check();

    // Fetch credentials from fixture file
    const { User, Password } = example.CXUser[0];

    // Enter username and password
    cy.get('#txtUserName').type(User);
    cy.get('#txtPassword').type(Password);

    // Click the login button
    cy.get('#btnLogin').click();

    // Select the db from the Feedyard dropdown
    cy.get('#ddlFeedyardList').select('jacksonsandbox-JKS2');

    // Click the connect button
    cy.get('#btnConnect').click();

    // Hover over the Procurement menu and navigate to Cattle Contract
    cy.contains('Procurement').trigger('mouseover');
    cy.contains('Projection/Closeout Worksheet').click();
    cy.wait(5000)
    cy.get('#rbtnComplete').click();
    cy.get('#ddlLot').select('420');
  });

  it('Verify that the owner can change the out-date, uncheck the "Complete" box, and update the projection end-date', () => {
    cy.reload();
    // Ensure the user is on the same Projection/Closeout worksheet
    cy.get('#rbtnComplete').click();
    cy.get('#ddlLot').select('420');

    // Debugging: Check if OutWeight exists and is a number before calling .toFixed()
    cy.window().then((win) => {
      const outWeight = win.object?.ProjectionCloseoutActual?.OutWeight;
      if (typeof outWeight !== 'number') {
        console.warn('OutWeight is not a number:', outWeight);
      } else {
        console.log('OutWeight:', outWeight.toFixed(2));
      }
    });

    // // Uncheck the "Complete" box to move the lot to the incomplete state
    cy.wait(2000); // Wait for elements to be loaded

// Ensure the checkbox is visible and enabled before clicking
cy.get('#chkComplete').should('be.visible').and('not.be.disabled').click();

// Verify it is unchecked
cy.get('#chkComplete').should('not.be.checked');

    // // Save the changes (Assuming a 'Save' button exists)
    cy.get('#Projectionsavebtn').click();

    cy.xpath('//*[@id="popup_ok"]').click();

    cy.get('#rbtnIncomplete').click();
    cy.get('#ddlLot').select('420');
    cy.get('#chkOutDate').click();
    cy.wait(3000)
    cy.get('#txtOutDateProj').clear().type('10/17/2025');
    cy.get('#chkComplete').click();
    cy.get('#Projectionsavebtn').click();
    cy.xpath('//*[@id="popup_ok"]').click();
  });
  it('Verify that the owner ca', () => {
    cy.reload();
    // Ensure the user is on the same Projection/Closeout worksheet
    cy.get('#rbtnComplete').click();
    cy.get('#ddlLot').select('420');
  });
});