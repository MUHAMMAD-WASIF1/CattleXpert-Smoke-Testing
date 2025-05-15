import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

describe('Verify Sorted Listing Report', () => {
  let nav;

  // Load navigation fixture before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Verify data in Sort Listing Report', () => {
    // Step 1: Perform login
    login_headstrom();

    // Step 2: Navigate to "Sorted Listing Report"
    cy.get(nav.Reports).click();           // Click on Reports
    cy.get(nav.R_lot).click();             // Click on Lot Reports
    cy.get("#Item_JHS245").click();        // Click on Sorted Listing Report
    cy.get('table', { timeout: 10000 }).should('be.visible'); // Wait for report table to load

    // Step 3: Assert expected header titles in the report table
    cy.contains('Name').should('exist');
    cy.contains('Short Name').should('exist');
    cy.contains('Buyer Nick Name').should('exist');
    cy.contains('Commission/CWT').should('exist');
    cy.contains('Buyer List').should('exist');

    // Step 4: Define expected values to verify in the report
    const expectedData = {
      Name: 'Lance  Reed',
      Short_Name: 'LR',
      Buyer_Nick_Name: 'Lans',
      Commission_CWT: '10.000'
    };

    // Step 5: Assert that expected data appears in the report table
    cy.get('table').contains('td', expectedData.Name).should('exist');
    cy.get('table').contains('td', expectedData.Short_Name).should('exist');
    cy.get('table').contains('td', expectedData.Buyer_Nick_Name).should('exist');
    cy.get('table').contains('td', expectedData.Commission_CWT).should('exist');

    // Step 6: Navigate to System Setup -> Profile -> Buyer
    cy.get(nav.System_Setup).click();
    cy.get(nav.Profile).click();
    cy.get(nav.Buyer).click();

    // Step 7: Click on the buyer name in the grid
    cy.get('#JHS266 > [aria-describedby="productGridView_PRFL_COMP_NAME"]')
      .as('buyerRow')
      .click();

    // Step 8: Verify buyer information in the Buyer Profile screen
    cy.contains(expectedData.Short_Name).should('exist');
    cy.get('#txtCommissionWeight').click(); // Assuming this is for further verification or display
  });
});
