import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  // Load navigation fixture before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and verifying the Analysis Report", () => {
    // Log in to the application
    login_headstrom();

    // Navigate to "Customer Closeout" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_lot).click();
    cy.get(nav.R_Lot_Analysis).click();

    // Wait for the report to load
    cy.wait(2000);

    //Enter the Lot Number
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_ddValue"
    ).select("ANH01", { force: true });

    // Click the "View Report" button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    // Wait for the report to load
    cy.wait(3000);

    //Verify the key headers of the report
    cy.contains("In Date").should("exist");
    cy.contains("Head Count").should("exist");
    cy.contains(/Pay\s*Weight/).should("exist");
    cy.contains(/Avg\s*Pay\s*Weight/).should("exist");
    cy.contains(/Weight\s*Received/).should("exist");
    cy.contains(/Avg\s*Wght\s*Recvd/).should("exist");
    cy.contains(/%\s*Shrink/).should("exist");
    cy.contains(/Total\s*Cost/).should("exist");
    cy.contains(/Cost\s*CWT/).should("exist");
    cy.contains("Origin").should("exist");
    cy.contains("Buyer").should("exist");
    cy.contains("Buy").should("exist");
    cy.contains("Trans").should("exist");

    // Store expected values
    const expectedData = {
        Head_Count: '100',
        Avg_Pay_Weight: '600',
        Total_Cost: '0.00',
        Cost_CWT: '0.00',

    };

//Navigate to Processing module and Lot Details screen   
cy.get(nav.Processing).click();
cy.get(nav.Lot_Details).click();
cy.wait(2000); 

// Type Lot Number in the dropdown
cy.get('.ui-button').type('ANH01'); // Type the value
cy.get('.ui-menu-item').contains('ANH01').click(); 
cy.wait(2000); 

// Navigate to the Summary tab screen
cy.get("#btnSummary").click(); 
    
// Wait for the report to load
cy.wait(2000);

// Step 1: Select "Specify Dates" option
cy.get('[value="S"]').click(); // Select the "Specify Dates" radio button

// Step 2: Set the "From" date
cy.get('#txtLDSFromDate') // Replace with the actual selector for the "From" date field
  .clear() // Clear any existing value
  .type("04/14/2025"); // Enter the start date

// Step 3: Set the "To" date
cy.get('#txtLDSToDate') // Replace with the actual selector for the "To" date field
  .clear() // Clear any existing value
  .type("04/14/2025"); // Enter the end date
  
  //verify the Head Count from the  Summary tab
  cy.contains(expectedData.Head_Count).should('exist');
  cy.get('[style="margin-top:-12px"] > :nth-child(1)').click(); 
  
  // Wait for the report to load
    cy.wait(3000);

  //Close the summary tab
  cy.get('.ui-dialog-titlebar > .ui-button > .ui-button-icon-primary').click(); 
  
  // Wait for the report to load
  cy.wait(2000);

  //verify the Data from the Lot details screen
  cy.contains(expectedData.Avg_Pay_Weight).should('exist');
  cy.contains(expectedData.Total_Cost).should('exist');
  cy.contains(expectedData.Cost_CWT).should('exist');

});
 
});
