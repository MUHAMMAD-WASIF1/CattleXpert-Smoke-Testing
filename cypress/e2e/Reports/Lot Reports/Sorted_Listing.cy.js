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
    // Perform login
    login_headstrom();

    // Navigate to the "Reports" section
    cy.get(nav.Reports).click();
    cy.get(nav.R_lot).click();// Lot Reports
    cy.get("#Item_JHS245").click(); // Sorted Listing Report
    cy.wait(2000);
  // Assert expected header titles in the report table
  cy.get('table').should('be.visible');
  cy.contains('Name').should('exist');
  cy.contains('Short Name').should('exist');
  cy.contains('Buyer Nick Name').should('exist');
  cy.contains('Commission/CWT').should('exist');
  cy.contains('Buyer List').should('exist');
 cy.wait(2000);
 // Expected values to verify in the report
 const expectedData = {
    Name: 'Lance  Reed',
    Short_Name: 'LR',
    Buyer_Nick_Name: 'Lans',
    Commission_CWT: '10.000'
 }
//navigate to system setup
cy.get(nav.System_Setup).click();
cy.get(nav.Profile).click();
cy.get(nav.Buyer).click();

//click on the buyer name
cy.get('#JHS266 > [aria-describedby="productGridView_PRFL_COMP_NAME"]').click();
// Verify the buyer information
cy.contains(expectedData.Short_Name).should('exist');
cy.contains('label', 'Assign Default Commission/CWT:', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible');

// Verify the commission value
cy.get('#txtCommissionWeight').should('have.value', expectedData.Commission_CWT);


})
})

