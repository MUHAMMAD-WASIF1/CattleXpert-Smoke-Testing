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

  it("Verifying the Commodity Scale Ticket Vendor Report", () => {
    // Step 1: Log in to the application
    login_headstrom();

    // Step 2: Navigate to the Commodity Scale Ticket Reports
    cy.get(nav.Reports).click();
    cy.get('#Item_JHS267').click(); // Click on parent menu
    cy.get('#Item_JHS275').click(); // Click on Commodity Scale Ticket Vendor Report

    // Step 3: Select date range
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue')
      .type('04/01/2025'); // Start date

    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_txtValue')
      .invoke('removeAttr', 'disabled') // Enable end date input
      .type('05/06/2025', { force: true }); // End date

    // Step 4: Select 'All' vendors from the dropdown
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl08_ddValue')
      .select('1');

    // Step 5: Click on 'View Report' button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
    cy.wait(2000); // Wait for report to load

    // Step 6: Validate report header details
    cy.contains('h1', 'Vendor').should('exist');
    cy.contains('Ernie Douglas').should('exist');
    cy.contains('Contract: KS21042025').should('exist');
    cy.contains('Vendor Contract: ED').should('exist');
    cy.contains('Commodity : Corn').should('exist');
    cy.contains('Basic Price /TON: 500.0000000000').should('exist');

    // Step 7: Validate table headers
    cy.scrollTo('center');
    cy.contains('Date').should('exist');
    cy.contains('Gross Wt').should('exist');
    cy.contains('Tare Wt').should('exist');
    cy.contains('Net Wt').should('exist');
    cy.contains('Discount').should('exist');
    cy.contains('Amount').should('exist');
    cy.contains('Pay Weight').should('exist');
    cy.contains('Pay price per').should('exist');
    cy.contains('Total').should('exist');
    cy.contains(/Bill\s*of\s*Landing/).should('exist'); // Should be "Lading" in real report?
    cy.contains('Rmrks').should('exist');

    // Step 8: Validate specific row data for ticket #21042025
    cy.contains('21042025').should('exist');
    cy.contains('10,000.000').should('exist');
    cy.contains('50.000').should('exist');
    cy.contains('9,950.000').should('exist');
    cy.contains('4.975').should('exist');
    cy.contains('0.250').should('exist');
    cy.contains('2,487.500').should('exist');
    cy.contains('123').should('exist');
    cy.contains('TESTING').should('exist');

    // Step 9: Define expected values to verify in Lot Detail page
    const expectedData = {
      Contract: 'KS21042025',
      Date: '4/21/2025',
      Commodity: 'Corn',
      Vendor: 'ED',
      Received_Weight: '9,950',
      Basic_Price_TON: '500.0000',
    };

    // Step 10: Navigate to Commodity Contract Scale Ticket screen
    cy.get(nav.Commodity).click();
    cy.get(nav.Commodity_Contract_Scale_Ticket).click();

    // Step 11: Select the contract
    cy.get('#General > a').click(); // General tab
    cy.get('#JHS1 > [aria-describedby="contractGridView_ContractNo"]').click(); // Contract row

    // Step 12: Validate data in the Lot Detail screen
    cy.contains(expectedData.Contract).should('exist');
    cy.contains(expectedData.Date).should('exist');
    cy.contains(expectedData.Commodity).should('exist');
    cy.contains(expectedData.Vendor).should('exist');

    // Navigate to Weight tab and verify Received Weight
    cy.get('#tab_Weight > span').click();
    cy.contains(expectedData.Received_Weight).should('exist');
  });
});
