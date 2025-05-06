import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

describe('Verify Market Valuation Report data', () => {
  let nav;

  beforeEach(() => {
    // Load navigation data from fixture
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Market Valuation Report', () => {
    // Login using custom function
    login_headstrom();

    // Navigate to Market Valuation Report
    cy.get(nav.Reports).click(); // Open Reports menu
    cy.get("#Item_JHS254").click(); // Click on Cattle Reports
    cy.get("#Item_JHS260").click(); // Click on Market Valuation Report
    cy.wait(2000);

    // Select the report start date
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue')
      .type("04/30/2025");
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00')
      .click(); // Click on View Report button
    cy.wait(2000);

    // Assert expected header titles in the report table
    cy.get('table').should('be.visible');
    cy.contains('Market Valuation').should('exist');
    cy.contains('Lot').should('exist');
    cy.contains(/Pen\s*Number/).should('exist');
    cy.contains('Gender').should('exist');
    cy.contains(/Current[\s_]Head/).should('exist');
    cy.contains(/Current\s*Avg\s*Weight/).should('exist');
    cy.contains(/Total\s*Pen\s*Weight/).should('exist');
    cy.contains(/Value[\s_]Factor/).should('exist');
    cy.contains(/Calculated\s*Value/).should('exist');

    // Expected values to verify in the report
    const expectedData = {
      Lot_Number: 'HCF24-2',
      Gender: 'HF',
      Pen_Number: '0035',
      Current_Head: '175',
      Current_Avg_Weight: '572',
      Total_Pen_Weight: '100,100', // 175 * 572
      Value_Factor: '300.00',
      Calculated_Value: '$300,300.00' // Example of expected calculated value
    };

    // Verify the data row in the report table matches expected values
    cy.get('table').contains('tr', expectedData.Lot_Number).within(() => {
      cy.contains('td', expectedData.Current_Head).should('exist');
      cy.contains('td', expectedData.Current_Avg_Weight).should('exist');
      cy.contains('td', expectedData.Total_Pen_Weight).should('exist');
      cy.contains('td', expectedData.Value_Factor).should('exist');
      cy.contains('td', expectedData.Calculated_Value).should('exist');
    });

    // Navigate to Lot Detail page under Processing menu
    cy.get('#Item_JHS16').click(); // Click on Processing
    cy.get('#Item_JHS18').click(); // Click on Lot Detail
    cy.wait(2000);

    // Enter the Lot Number to view details
    cy.get('#txtEditLotNumber').type("HCF24-2").type('{enter}');
    cy.wait(2000); // Wait for Lot Detail to load

    // Verify Lot Detail summary information
    cy.contains(expectedData.Lot_Number).should('exist');
    cy.contains(expectedData.Gender).should('exist');
    cy.contains(expectedData.Pen_Number).should('exist');
    cy.contains(expectedData.Current_Head).should('exist');

    // Navigate to Market Valuation screen under System Setup > Invoice
    cy.get(nav.System_Setup).click(); // Click on System Setup
    cy.get('#Item_JHS110').click(); // Click on Invoice
    cy.get('#Item_JHS144').click(); // Click on Market Valuation
    cy.wait(2000);

    // Verify the Value Factor (Price Cwt) is displayed
    cy.contains(expectedData.Value_Factor).should('exist');
  });
});
