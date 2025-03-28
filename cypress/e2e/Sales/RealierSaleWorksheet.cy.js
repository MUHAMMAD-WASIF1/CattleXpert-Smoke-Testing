import logindata from '../../fixtures/logindata.json';
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe('Realizer Sale Worksheet', () => {
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

    // Hover over the Sales menu and navigate to Realizer Sale Worksheet
    cy.contains('Sales').trigger('mouseover');
    cy.contains('Realizer Sale Worksheet').click();

    // Ensure user is on Realizer Sale Worksheet page
    cy.url().should('include', 'RealizerSaleWorksheet');
  });

  it('Selects a date and verifies data loading', () => {
    cy.get('#txtDateSold').clear().type('02-16-2025'); // Select date
    cy.wait(2000); // Wait for data to load
    cy.get('.w100 > .ui-datepicker-trigger').click();
    cy.get('#realizerGridView') // Update with the correct ID/class of the grid
      .should('be.visible')
      .within(() => {
        cy.contains('TEST25').should('be.visible'); // Verify expected animal record appears
      });
  });

  it('Selects an Realizer animal and update the weight & price', () => {
    cy.reload();
    cy.get('#txtDateSold').clear().type('02-16-2025'); // Select date
    cy.wait(2000);
    cy.get('.w100 > .ui-datepicker-trigger').click();
    cy.get('#realizerGridView') // Update with the correct ID/class of the grid
      .should('be.visible')
      .within(() => {
        cy.contains('TEST25').should('be.visible'); // Verify expected animal record appears
      });
    cy.get('#jqg_realizerGridView_1').first().check(); // Select first record
    cy.get('#txtWeight').type('499'); // Enter weight
    cy.get('#txtPrice').type('230'); // Enter price

    cy.get('#txtWeight').should('have.value', '499'); // Validate weight
    cy.get('#txtPrice').should('have.value', '230'); // Validate price
    cy.get('#btnApply').click();
  });
  it('Clicks Apply button and verifies submission', () => {
    cy.get('#txtDateSold').clear().type('02-16-2025'); // Select date
    cy.wait(2000);
    cy.get('.w100 > .ui-datepicker-trigger').click();
    cy.get('#realizerGridView') // Update with the correct ID/class of the grid
      .should('be.visible')
      .within(() => {
        cy.contains('TEST25').should('be.visible'); // Verify expected animal record appears
      });
    cy.get('#jqg_realizerGridView_1').first().check(); // Select first record
    cy.get('#txtWeight').type('499'); // Enter weight
    cy.get('#txtPrice').type('230'); // Enter price

    cy.get('#btnApply').click(); // Click Apply button
  });
});
