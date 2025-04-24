import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';
describe("Verifying data of Daily Feed Per Head(Feed Out)", () => { // Fixed the syntax error in the describe title
  let nav;
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });
  it("Generating and verifying data of Daily Feed Per Head(Feed Out)", () => {
    login_headstrom();
    // Navigate to the report
    cy.get(nav.Reports).click();
    cy.get(nav.Actual_Feed).click();
    cy.get(nav.Daily_Feed_Per_Pen_Feed_Out).click();
    // Set Begin Date using JavaScript
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue') // Replace with the actual selector
      .invoke('val', '04/08/2025'); // Set the value directly
    // Set End Date using JavaScript
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue') // Replace with the actual selector
      .invoke('val', '04/23/2025'); // Set the value directly
    // Click the "View Report" button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00') // Replace with the actual selector for the "View Report" button
      .click();
      // Verify the columns of report by assert table headers
    const expectedHeaders = [
        'Lot', 'Pen', 'Gender', 'Pen Start Date', 'Ration',
        'Ration Code', 'AF Per Head', 'AF Total', 'Current Head Cnt', 'Current Weight ',
        'DM Per Head', 'DM Total', 'ADG', 'Avg DOF','Body Wt %'
      ];
      // Verify that the data in the report
      cy.contains('JHF25-2').should('be.visible');
      cy.contains('0001').should('be.visible');
      cy.contains('HF').should('be.visible');
      cy.contains('3/14/2025').should('be.visible');
      cy.contains('Finisher').should('be.visible');
      cy.contains('H596').should('be.visible');
      cy.contains('29.56').should('be.visible');
      cy.contains('2010.00').should('be.visible');
      cy.contains('68').should('be.visible');
      cy.contains('490').should('be.visible');
      cy.contains('20.45').should('be.visible');
      cy.contains('1390.31').should('be.visible');
      cy.contains('6.37').should('be.visible');
      cy.contains('30').should('be.visible');
      cy.contains('4.20').should('be.visible');
     
     //Navigate to Processing module and Lot Details screen   
      cy.get(nav.Processing).click();
      cy.get(nav.Lot_Details).click();
    
      cy.get('.ui-button').should('be.visible').click(); // Open the dropdown
      // Type 'JHF25-2' into the dropdown and select it
      cy.get('.ui-button').type('JHF25-2'); // Type the value
      cy.get('.ui-menu-item').contains('JHF25-2').click(); 
     // Verify that the data in the report
     cy.contains('Heifer').should('be.visible');
//Navigate to Processing module and Lot Details screen   
cy.get(nav.Feed).click();
cy.get(nav.Feed_Call_Pen_Consumption).click();
cy.get('.custom-combobox').type('0001'); // Type '0001' into the dropdown and select it
    });
});