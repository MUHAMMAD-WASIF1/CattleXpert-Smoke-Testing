import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

describe("Verifying data of the Ration Worksheet", () => {
  let nav;

  // Load navigation locators before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and verifying data of the Ration Worksheet Report", () => {
    // Perform login
    login_headstrom();
   
    // Navigate to the Ration Worksheet Report
    cy.get(nav.Reports).click();
    cy.get(nav.Actual_Feed).click();
    cy.get(nav.Ration_Worksheet_Report).click();

    // Set the report date
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue')
      .type('04/01/2025'); 

    // Click the "View Report" button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
      
    // Verify key headers and data are visible in the report
    cy.contains('Ration H598').should('be.visible');
    cy.contains('100,000').should('be.visible');
    cy.contains('125.46').should('be.visible');
    
    // Navigate to the System Setup > Feed > Ration Worksheet screen
    cy.get(nav.System_Setup).click();
    cy.get(nav.System_Setup_Feed).click();
    cy.get(nav.System_Setup_Feed_RationWorksheet).click();
   
    // Select "CNS starter" ration from the dropdown
    cy.get('.custom-combobox').click().type('CNS starter'); 
    cy.get('.ui-menu-item').contains('CNS starter').click(); 

    // Assertions to verify the loaded ration details
    cy.get('#txtRationNeg').should('have.value', '39.29');
    cy.get('#txtRationNem').should('have.value', '66.57');
    cy.get('#txtRationCode').should('have.value', 'H598');
    cy.get('#txtRationNotes').should('have.value', 'CNS Starter');
  });
});
