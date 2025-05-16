import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {
  let nav;

  // Load navigation fixture before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });


  it("Generate and Verify data of the Invoice Variance Report Validation", () => {
    // Log in to the application
    login_headstrom();

    // Navigate to "Invoice Summary" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_invoice).click();
    cy.get(nav.R_InvoiceVariance).click();

    //Enter the 'Start Date' 
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue')
     .type("4/1/2025 ");
    //Enter the 'End Date'
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_txtValue')
     .invoke('val', '5/1/2025 ')
     .trigger('input') 
     .trigger('blur');

    cy.wait(2000);

    //Select the Lot Number from the dropdown
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl08_ddValue')
    .select('3');

    // Click on the 'View Report' button
    cy.get("#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00").click();
    cy.wait(5000);

     // Verify report headers
     cy.contains("Invoice Variance").should("exist");
     cy.contains("Invoice").should("be.visible");
     cy.contains("Calculated").should("be.visible");
     cy.contains("Lot").should("be.visible");
     cy.contains("Start").should("be.visible");
     cy.contains("End").should("be.visible");
     cy.contains("Charge Description").should("be.visible");
     cy.contains("Quantity").should("be.visible");


   
//     // Store expected data values
//     const expectedData = {
//         owner: 'Broken Arrow Livestock',
//         ration: 'Silage Grower',
//         value: '85.40',
      
//     };
   

        //Navigate to Processing module and Lot Details screen   
        cy.get(nav.Processing).click();
        cy.get(nav.Lot_Details).click();
        cy.wait(2000); 

        cy.get('.ui-button').should('be.visible').click(); // Open the dropdown
        // Type 'BAL24-1' into the dropdown and select it
        cy.get('.ui-button').type('BAL24-1'); // Type the value
        cy.get('.ui-menu-item').contains('BAL24-1').click(); 
        cy.wait(2000); 
    


//     // Verify the data of the report
//     cy.contains(expectedData.owner).should('exist');
//     cy.contains(expectedData.ration).should('exist');
//     cy.contains(expectedData.value).should('exist');
    
  });
});
