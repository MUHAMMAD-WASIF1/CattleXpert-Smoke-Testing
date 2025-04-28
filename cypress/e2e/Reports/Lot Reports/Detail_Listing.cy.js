import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

describe('Verify the Detail Listing Report', () => {
  let nav;

  // Load navigation fixture before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Generating and verifying data of the Detail Listing Report', () => {
    // Log in to the application
    login_headstrom();

    // Navigate to "Customer Closeout" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_lot).click();
    cy.get(nav.R_Lot_DetailListing).click();

// Step 1: Select "BAL24-1" from the LOT dropdown using value="60"
cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_ddValue')
.select('BAL24-1', { force: true }) // Force select in case it's hidden or disabled


// Step 2: Click the "View Report" button
cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();

// Step 3: Wait for the report to load
cy.wait(5000); // Adjust the wait time if necessary

 //Verify the key headers of the report 
 const expectedHeaders = [
    "Date", "Type", "From Lot",
    "Head In", "Head Out", "To Lot",
    "Owner", "Lot Class", "Origin",
    "Pay Weight", "Off Truck Weight",
    "Cattle", "Freight", "Comission"
  ]; 

  // Store expected values
  const expectedData = {
    Lot_Number: 'BAL24-1',
    Owner : 'Broken Arrow Livestock Inc',
    Start_Date: '1/24/2025',
    Type: 'Home',
    Status: 'Active',
    Avg_Pay_Weight : '586',
    Avg_DOF:'93'
};


//Navigate to Processing module and Lot Details screen   
cy.get(nav.Processing).click();
cy.get(nav.Lot_Details).click();
cy.wait(2000); 

cy.get('.ui-button').should('be.visible').click(); // Open the dropdown
// Type 'BAL24-1' into the dropdown and select it
cy.get('.ui-button').type('BAL24-1'); // Type the value
cy.get('.ui-menu-item').contains('BAL24-1').click(); 
cy.wait(2000); 

//verify the report data on the Lot deatils screen
cy.contains(expectedData.Lot_Number).should('exist');
cy.contains(expectedData.Owner).should('exist');
cy.contains(expectedData.Start_Date).should('exist');
cy.contains(expectedData.Type).should('exist');
cy.contains(expectedData.Status).should('exist');
cy.contains(expectedData.Avg_Pay_Weight).should('exist');
cy.contains(expectedData.Avg_DOF).should('exist');


  });
});
