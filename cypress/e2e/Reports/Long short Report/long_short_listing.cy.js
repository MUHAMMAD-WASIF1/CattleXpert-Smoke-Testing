import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

let nav;

// Load the navigation fixture before each test
beforeEach(() => {
  cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
    nav = headstrom_navigation;
  });
});

describe('Verify the Long Short Listing Report', () => {

  it('Should validate the Long Short Listing Report and cross-check with Sales module', () => {
    // Log into the application
    login_headstrom();

    // Navigate to the Reports section
    cy.get(nav.Reports).click();
    cy.get("#Item_JHS280").click(); // Long Short Report
    cy.get("#Item_JHS281").click(); // Long Short Listing Report

    // Wait for report UI to load
    cy.wait(2000);

    // Set the report date range
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue')
      .type('4/17/2025'); // Start Date
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue')
      .type('4/18/2025'); // End Date

    // Select "All" for location
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl07_ddValue')
      .select('1'); // Location dropdown

    // Click "View Report"
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00')
      .click();

    // Wait for report to render
    cy.wait(2000);

    // Validate key column headers in the report
    cy.contains(/Long\s*\/\s*Short\s*Type/).should('exist');
    cy.contains(/Process[\s_]Date/).should('exist');
    cy.contains(/Lot[\s_]Number/).should('exist');
    cy.contains(/Lot[\s_]I/).should('exist');
    cy.contains('Gender').should('exist');
    cy.contains('Head Count').should('exist');
    cy.contains('Pay Weight').should('exist');
    cy.contains(/Price[\s_]Per[\s_]CWT/).should('exist');
    cy.contains(/Net\s*Amount/).should('exist');

    // Expected data to validate in the report
    const expectedData = {
      Long_Short_Type: 'Long',
      Lot_Number: 'ANH01',
      Gender: 'MX',
      Price_Per_CWT: '250.00',
      Head_Count: '20',
      Pay_Weight: '12,000',
    };

    // Navigate to Sales Module
    cy.get(nav.Sales).click();
    cy.get(nav.Cattle_Sales).click();

    // Wait for Sales screen to load
    cy.wait(2000);

    // Search for the specific lot number
    cy.get('#txtEditLotNumber').type(expectedData.Lot_Number).type('{enter}');

    // Wait for search results to populate
    cy.wait(2000);

    // Navigate to Long/Short and Holdovers section
    cy.get('#LotPenAssignment > a').click();

    // Wait for details to load
    cy.wait(2000);

    // Validate summary tab values
    cy.contains(expectedData.Long_Short_Type).should('exist');
    cy.contains(expectedData.Lot_Number).should('exist');
    cy.contains(expectedData.Gender).should('exist');
    cy.contains(expectedData.Price_Per_CWT).should('exist');
    cy.contains(expectedData.Head_Count).should('exist');
    cy.contains(expectedData.Pay_Weight).should('exist');
  });

});
