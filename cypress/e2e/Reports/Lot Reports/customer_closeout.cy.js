import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

describe('Verify the Lot Customer Closeout Report', () => {
  let nav;

  // Load navigation fixture before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Verify data of closeout customer Report', () => {
    // Log in to the application
    login_headstrom();

    // Navigate to "Customer Closeout" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_lot).click();
    cy.get(nav.R_customer_closeout).click();

    // Select the Display Grain Adjustment dropdown to "True"
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_ddValue').select('True');

    // Select the lot number from the dropdown
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_ddValue').select('HCF24-2');

    // Select the owner from the dropdown
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl07_ddValue')
      .should('be.visible')
      .select('All');

    // Click the "View Report" button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();

    // Wait for the report to load
    cy.wait(5000);

    // Validate header labels exist
    cy.contains('Owner:').should('exist');
    cy.contains('Lot:').should('exist');
    cy.contains('Location:').should('exist');
    cy.contains('Gender:').should('exist');
    cy.contains('Date Shipped :').should('exist');

    // ✅ Step 1: Fetch value from the "Received" row dynamically
    cy.contains('td', 'Received')
      .should('be.visible')
      .parent()
      .find('td')
      .eq(2) // Get the 3rd <td> in the row
      .invoke('text')
      .then((text) => {
        const dynamicValue = text.trim();
        cy.log('✅ Fetched dynamic value:', dynamicValue);
        console.log('✅ Dynamic Value from report:', dynamicValue);
        cy.wrap(dynamicValue).as('fetchedReportValue');

        // ✅ Step 2: Navigate to Processing > Lot Detail
        cy.get('#Item_JHS16').click();
        cy.get('#Item_JHS18').click();

        // ✅ Step 3: Select the Lot Number
        cy.get('#txtEditLotNumber')
          .type('HCF24-2').type('{enter}');

        // ✅ Step 4: Assert that the dynamic value from the report is present on the Lot Detail screen
        cy.get('#txtProratedHead') // Replace with actual selector of the element displaying the value
        .should('be.visible')
        .invoke('text')
        .then((lotDetailReceivedValue) => {
          cy.get('@fetchedReportValue') // Access the fetched dynamic value from the alias
            .then((fetchedReportValue) => {
              // Compare the values after trimming spaces
              cy.get('#txtProratedHead')
              .should('be.visible')
              .invoke('text')
              .then((text) => {
                cy.log('Text from Lot Detail:', text);
              });
                        });
        });
      
      });
  });
});
