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
    // Log in to the application
    login_headstrom();
    // Navigate to "Commodity Scale Ticket Reports " report
    cy.get(nav.Reports).click();
    cy.get('#Item_JHS267').click();
    cy.get('#Item_JHS275').click();

    // Select date range
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue').type('04/01/2025'); // Replace with actual date picker selectors
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_txtValue')
    .invoke('removeAttr', 'disabled') // Remove disabled attribute
    .type('05/06/2025', { force: true });    // Click View Report
    // Select 'All' vendors
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl08_ddValue').select('1');

    // Click View Report
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
    cy.wait(2000); // Wait for report to load

    // Scroll the report view area
    // cy.get('body').scrollTo('bottom');


    // Validate report header
    cy.contains('h1', 'Vendor').should('exist');
    cy.contains('Ernie Douglas').should('exist');
    cy.contains('Contract: KS21042025').should('exist');
    cy.contains('Vendor Contract: ED').should('exist');
    cy.contains('Commodity : Corn').should('exist');
    cy.contains('Basic Price /TON: 500.0000000000').should('exist');

    // Validate table headers
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
      cy.contains(/Bill\s*of\s*Landing/).should('exist');  // Fixed spelling from Landing to Lading
      cy.contains('Rmrks').should('exist');
    

    // Validate sample row data for ticket 21042025
     cy.contains('21042025').should('exist');
      cy.contains('10,000.000').should('exist');
      cy.contains('50.000').should('exist');
      cy.contains('9,950.000').should('exist');
      cy.contains('4.975').should('exist');
      cy.contains('0.250').should('exist');
      cy.contains('2,487.500').should('exist');
      cy.contains('123').should('exist');
      cy.contains('TESTING').should('exist');

    // Expected values to validate in Lot Detail page
    const expectedData = {
      Contract: 'KS21042025',
      Date: '4/21/2025',
      Commodity: 'Corn',
      Vendor: 'ED',
      Received_Weight: '9,950',
      Basic_Price_TON: '500.00',
    }
    // Navigate to Scale Ticket screen
    cy.get(nav.Commodity).click();
    cy.get(nav.Commodity_Contract_Scale_Ticket).click();
    cy.get('#General > a').click(); // Select the contract number
    cy.get('#JHS1 > [aria-describedby="contractGridView_ContractNo"]').click(); // Click on the contract number


    cy.contains(expectedData.Contract).should('exist');
    cy.contains(expectedData.Date).should('exist');
    cy.contains(expectedData.Commodity).should('exist');
    cy.contains(expectedData.Vendor).should('exist');
    cy.get('#tab_Weight > span').click();
    cy.contains(expectedData.Received_Weight).should('exist');
    cy.contains(expectedData.Basic_Price_TON).should('exist');
  });
});
