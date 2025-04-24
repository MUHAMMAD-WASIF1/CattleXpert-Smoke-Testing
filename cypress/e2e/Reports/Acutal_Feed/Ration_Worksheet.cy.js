import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';
describe("Verifying data of the Ration Worksheet", () => { // Fixed the syntax error in the describe title
  let nav;
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });
  it("Generating and verifying data of the Ration Worksheet Report", () => {
    login_headstrom();
      // Navigate to the report
      cy.get(nav.Reports).click();
      cy.get(nav.Actual_Feed).click();
      cy.get(nav.Ration_Worksheet_Report).click();
      // Set the Date
      cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue').type('04/01/2025'); 
  
      // Click the "View Report" button
      cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
      
       // Verify the heading of the report
       const expectedHeaders = [
        'Rations Worksheet ', 'CNS starter', 'Load Size', 'Pen Ration DM', 'Corporate Cost Per Pound',
        'Custom Cost Per Pound ', 'DM', 'Commodity', 'As Fed%', 'LBS',
        'Total Pounds'
      ];
      
      // Verify that the data in the report
      cy.contains('Ration H598').should('be.visible');
      cy.contains('100,000').should('be.visible');
      cy.contains('125.46').should('be.visible');
   
       //Navigate to System Setup Feed RationWorksheet screen   
       cy.get(nav.System_Setup).click();
       cy.get(nav.System_Setup_Feed).click();
       cy.get(nav.System_Setup_Feed_RationWorksheet).click();
    // Type "CNS starter"
    cy.get('.custom-combobox').type('CNS starter');
   // cy.get('.custom-combobox').select(2);
    cy.get('.ui-button').click(); // Click the search button
    cy.get('#btnRefresh').click();
    // Assertions for data in the screen
    
     cy.contains('Ration Type ').should('be.visible');
     cy.contains('Description').should('be.visible');
     cy.contains('Short Name').should('be.visible');
     cy.contains('Category:').should('be.visible');
     cy.contains('Active?').should('be.visible');
     cy.contains('Ration Code').should('be.visible');
     cy.contains('Ration Type Code').should('be.visible');
    
  });
});
