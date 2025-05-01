import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

describe('Verify Owner List Report data', () => {
  let nav;

  // Load navigation paths before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Validates data in the Owner List Report and System Setup', () => {
    // Step 1: Log in
    login_headstrom();

    // Step 2: Navigate to Owner List Report
    cy.get(nav.Reports).click();                 // Click on Reports section
    cy.get("#Item_JHS166").click();              // Click on "Lists"
    cy.get("#Item_JHS172").click();              // Click on "Owner List"

    // Step 3: Verify key headers in the Owner List Report table
    cy.contains('Owner List').should('exist');
    cy.contains('Name').should('exist');
    cy.contains('Owner Short Name').should('exist');
    cy.contains('Owner Type ').should('exist');

    // Step 4: Define expected data values to verify
    const expectedData = {
      Bryan_Alexander: 'BA',
      Address: '32052 N US HWY 30',
    };

    // Step 5: Navigate to System Setup > Profile > Owner to cross-check the data
    cy.get(nav.System_Setup).click();            // Click on System Setup
    cy.get(nav.Profile).click();                 // Click on Profile
    cy.get(nav.Owner).click();                   // Click on Owner section

    // Step 6: Wait for data to load and verify expected values are present
    cy.wait(2000);
    cy.contains(expectedData.Bryan_Alexander).should('exist');
    cy.contains(expectedData.Address).should('exist');
  });
});
