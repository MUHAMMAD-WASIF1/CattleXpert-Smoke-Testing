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

  it("Verifying the Commodity Scale Ticket Carrier Report", () => {
    // Step 1: Log in to the application
    login_headstrom();

    // Step 2: Navigate to the Commodity Scale Ticket Reports
    cy.get(nav.Reports).click();
    cy.get('#Item_JHS267').click(); // Click on parent menu
    cy.get('#Item_JHS272').click(); // Click on Commodity Scale Ticket Carrier Report

  
    // Step 3: Select date range
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue')
    .type('04/01/2025');
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_txtValue').type('05/01/2025');
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click(); // Click on View Report button
    cy.wait(2000); // Wait for report to load

    // Step 6: Validate report header details
    cy.contains('h1', 'Carrier').should('exist');
    cy.contains('Record Listing by Carrier/Contract No').should('exist');
    cy.contains('PAID AND UNPAID').should('exist');
    
     // Step 7: Validate table headers
     cy.scrollTo('center');
     cy.contains('Date').should('exist');
     cy.contains(/Net\s*Weight/).should('exist');
     cy.contains(/Adj\s*Weight/).should('exist');
     cy.contains(/Truck\s*Num/).should('exist');  
     cy.contains(/Frght\s*Rate/).should('exist');  
     cy.contains(/Frght\s*Amt/).should('exist');  
     cy.contains(/Frght\s*Paid/).should('exist'); 
     cy.contains(/Doc\s*Num/).should('exist');   
     cy.contains(/BOL\s*Num/).should('exist');    
     cy.contains('Remarks').should('exist');
     cy.contains('Emp').should('exist'); 

     // Step 8: Validate specific row data for ticket #230425
    cy.contains('230425').should('exist');
    cy.contains('Silage').should('exist');
    cy.contains('5,000.000').should('exist');
    cy.contains('4,000.000').should('exist');
    cy.contains('AJ').should('exist');
    cy.contains('TR23').should('exist');
    cy.contains('60.000').should('exist');
    cy.contains('notes').should('exist');
    
    // Step 9: Define expected values to verify in Lot Detail page
    const expectedData = {
        Date: '4/23/2025',
        Carrier: 'Silage',
        Vendor: 'ED',
        Net_Weight: '9,950',
      };
 
     // Step 10: Navigate to Commodity Contract Scale Ticket screen
     cy.get(nav.Commodity).click();
     cy.get(nav.Commodity_Contract_Scale_Ticket).click();
 
     // Step 11: Select the contract
     cy.get('#General > a').click(); // General tab
     cy.get('#JHS1 > [aria-describedby="contractGridView_ContractNo"]').click(); // Contract row
 
     // Step 12: Validate data in the Lot Detail screen
     cy.contains(expectedData.Date).should('exist');
     cy.contains(expectedData.Carrier).should('exist');
     cy.contains(expectedData.Vendor).should('exist');
     cy.contains(expectedData.Net_Weight).should('exist');
 

  })
})