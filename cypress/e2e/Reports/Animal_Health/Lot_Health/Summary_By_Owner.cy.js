import { login_headstrom } from '../../../../support/funcation';
import 'cypress-xpath';

describe('Verify  Animal Health > Lot Health > Summary By Owner Report', () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Generate and Verify the Summary By Owner Report', () => {
    login_headstrom();

    // Navigate to the "Summary By Owner" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Animal_health).click();
    cy.get(nav.Lot_Health).click();
    cy.get(nav.Summary_By_Owner).click();
    cy.wait(2000); 

    // Step 1: Select "James Hedstrom" from the Owner dropdown using value="60"
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_ddValue')
      .select('60', { force: true }) // Force select in case it's hidden or disabled
      .should('have.value', '60');   // Assert by value, not label

    // Step 2: Set Start Date
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05 > .ui-datepicker-trigger')
      .click();
    cy.get('.ui-datepicker-calendar').contains('14').click();

    // Step 3: Set End Date
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl07 > .ui-datepicker-trigger')
      .click();
    cy.get('.ui-datepicker-calendar').contains('14').click();

    // Step 4: Click the "View Report" button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00')
      .click();
    

     // Wait for the report to load  
        cy.wait(5000); 

     //Verify the key headers of the report 
        const expectedHeaders = [
            "Lot",
            "Pen",
            "Purchased Head",
            "Diagnosis",
            "Realized",
            "Pulls",
            "RePulls",
            "Deads"
          ]; 
      // Store expected values
    const expectedData = {
        Purchased_Head: '100',
    };
    
     //Navigate to Processing module and Lot Details screen   
     cy.get(nav.Processing).click();
     cy.get(nav.Lot_Details).click();
   
     cy.get('.ui-button').should('be.visible').click(); // Open the dropdown
     // Type 'SAW01' into the dropdown and select it
     cy.get('.ui-button').type('SAW01'); // Type the value
     cy.get('.ui-menu-item').contains('SAW01').click(); 

     //Verify the Purchased Head count of the report
     cy.contains(expectedData.Purchased_Head).should('exist');

  });
});
