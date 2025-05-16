import { login_headstrom } from '../../support/funcation';
import 'cypress-xpath';

describe('Verify Ship Date Listing Summary Data', () => {
  let nav;

  // Load navigation fixture before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Verify data in Ship List Report and cross-check with Lot Detail', () => {
    // Perform login
    login_headstrom();

    // Navigate to the "Reports" section
    cy.get(nav.Reports).click();

    // Select the "Shipdate Listing Report"
    cy.get("#Item_JHS289").click();

    // Wait for report filters to become available
    cy.wait(2000);

    // Set date range for the report
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue')
      .type("10/1/2024"); // Start Date
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue')
      .type("10/30/2024"); // End Date

    // Select "All" for Grower dropdown
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl09_ddValue')
      .select("All");

    // Enable "Display Unsold"
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl11_ddValue')
      .select("True");

    // Select "True" for page break down by ship
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl13_rbTrue')
      .click();

    // Click on the "View Report" button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();

    // Wait for the report to load
    cy.wait(2000);

    // Validate key column headers in the report
    cy.contains('Ship Date Listing').should('exist');
    cy.contains('Lot').should('exist');
    cy.contains('Pen').should('exist');
    cy.contains('Gender').should('exist');
    cy.contains('DOF').should('exist');
    cy.contains(/Est\s*DOF/).should('exist');
    cy.contains(/Pay\s*Weight/).should('exist');
    cy.contains(/Current\s*Weight/).should('exist');
    cy.contains(/Tot\s*Head\s*Count/).should('exist');
    cy.contains(/Hosp\s*Head/).should('exist');
    cy.contains(/Net\s*Head/).should('exist');
    cy.contains('MW').should('exist');
    cy.contains('Owner').should('exist');
    cy.contains('Customer').should('exist');
    cy.contains(/Sold\s*Head/).should('exist');
    cy.contains(/Head\s*Schd/).should('exist');
    cy.contains(/Ship\s*Date/).should('exist');

    // Expected values to validate in Lot Detail page
    const expectedData = {
      Lot: 'CCC24-2',
      Pen: '0032',
      Gender: 'Heifer',
      DOF: '205',
      pay_weight: '444',
      Tot_Head_Count: '106',
      Owner: 'Cottonwood Creek Cattle Co'
    };

    // Navigate to Processing > Lot Detail
    cy.get('#Item_JHS16').click(); // Processing menu
    cy.get('#Item_JHS18').click(); // Lot Detail option

    // Wait for page to load
    cy.wait(2000);

    // Enter the Lot Number and submit
    cy.get('#txtEditLotNumber').type("CCC24-2").type('{enter}');

    // Wait for Lot Detail data to populate
    cy.wait(2000);

    // Validate values from the summary tab against expected data
    cy.contains(expectedData.Lot).should('exist');
    cy.contains(expectedData.Pen).should('exist');
    cy.contains(expectedData.Gender).should('exist');
    cy.contains(expectedData.DOF).should('exist');
    cy.contains(expectedData.pay_weight).should('exist');
    cy.contains(expectedData.Tot_Head_Count).should('exist');
    cy.contains(expectedData.Owner).should('exist');
  });
});
