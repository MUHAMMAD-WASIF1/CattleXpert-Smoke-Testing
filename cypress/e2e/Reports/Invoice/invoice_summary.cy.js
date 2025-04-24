import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

describe('Verify the Invoice summary from Summary Statement', () => {
  let nav;

  // Load navigation fixture before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Verify data between Lot summary Report and Summary Detail', () => {
    // Log in to the application
    login_headstrom();

    // Navigate to "Invoice Summary" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_invoice).click();
    cy.get("#Item_JHS224").click();

    // Set 'Start Date' and 'End Date'
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue')
      .type('3/1/2025');
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue')
      .type('3/15/2025');

    // Click on the 'View Report' button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();

    // Wait for the report to load
    cy.wait(2000);

    // Expected header values in the report
    const expectedHeaders = [
      'Invoicing Charges Summary',
      '03/01/2025 through 03/15/2025',
      'Processing Charges',
      'Feed Charges',
      'Lot Owner Charges',
      'Invoicing Charges Summary'
    ];

    // Verify table contains charge items and values
    cy.contains('Charges').should('exist');
    cy.get('tables').within(() => {
      cy.contains('td', 'All Medical Items').next().should('contain', '2,056.93');
      cy.contains('td', 'Bull Yardage').next().should('contain', '49.50');
      cy.contains('td', 'Cow Yardage').next().should('contain', '113.75');
      cy.contains('td', 'Prorated Yardage').next().should('contain', '2,943.40 ');
      cy.contains('td', ' Receiving Lot Feed').next().should('contain', '9,344.03 ');
      // cy.contains('td', 'Yardage').next().should('contain', '33,859.80 '); // Commented out line for potential debugging
      cy.contains('td', 'Corn').next().should('contain', '41,331.88');
      cy.contains('td', ' DDG Dry').next().should('contain', '30,229.26');
      cy.contains('td', 'GP').next().should('contain', '20,493.85');
      cy.contains('td', ' Oat Hay').next().should('contain', '1,095.47');
      cy.contains('td', 'Silage').next().should('contain', '69,938.47');
      cy.contains('td', 'Straw').next().should('contain', '309.19');
      cy.contains('td', ' Brand Inspection').next().should('contain', '$2,401.02 ');
      cy.contains('td', ' Health Certificate').next().should('contain', '$565.20 ');
      cy.contains('td', 'Total Feed Charges').next().should('contain', '$153,266.70');
    });

    // Additional verifications for presence of key data
    cy.contains(' All Medical Items').should('be.visible');
    cy.contains('2,056.93').should('be.visible');
    cy.contains('Yardage').should('exist');
    cy.contains('33,859.80').should('be.visible');

    // Navigate to "Invoice Statement" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_invoice).click();
    cy.get("#Item_JHS316").click();

    // Set 'Start Date' and 'End Date' for Invoice Statement
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue')
      .type('3/1/2025');
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue')
      .type('3/15/2025');

    // Click on 'View Report' button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();

    // Wait for report to load
    cy.wait(2000);

    // Validate content of the report
    cy.contains('BL24-2').should('be.visible');
    cy.contains('Medicine').should('be.visible');
    cy.contains('$ 161.35').should('be.visible');
    cy.contains('Yardage').should('exist');
    cy.contains('2,463.75').should('be.visible');

    // Navigate to next page of the report
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl05_ctl00_Next_ctl00_ctl00')
      .click();
  });
});
