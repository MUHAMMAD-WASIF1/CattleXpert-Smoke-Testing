import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

// Clear Cache Command
Cypress.Commands.add("clearSoftCache", () => {
  cy.window().then((win) => {
    win.localStorage.clear();
    win.sessionStorage.clear();
  });

  cy.window().then(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((reg) => reg.unregister());
      });
    }
  });
});

describe("Verify the Invoice summary from Summary Statement", () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generate and Verify data Charge Summary - Lot", () => {
    // Log in to the application
    login_headstrom();

    // Navigate to "Invoice Summary" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_invoice).click();
    cy.get(nav.R_Invoice_ChargeSummary_Lot).click();

    // Set 'Start Date' and 'End Date'
    cy.get("#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue").type("03/01/2025");
    cy.get("#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue").type("04/16/2025");

    // Click on the 'View Report' button
    cy.get("#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00").click();

    cy.wait(2000);

    const expectedHeaders = [
      "Charges Summary - Lot",
      "From 03/01/2025 to 04/16/2025",
      "Hedstrom Feedlot",
      "Feed Charges",
      "Wheatland, WY  82201",
    ];

    cy.wait(2000);

    // Store expected data values
    const expectedData = {
        owner: 'Broken Arrow Livestock',
        ration: 'Silage Grower',
        value: '85.40',
      
    };
   

    // Now navigate to "Invoice Statement" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_invoice).click();
    cy.get(nav.R_InvoiceStatement).click();

    cy.wait(2000);
    
    // 🌟 Clear soft cache before moving to next screen
    cy.clearSoftCache();

   // Set 'Start Date' and 'End Date'
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue')
      .type('03/01/2025');
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue')
      .type('04/16/2025');
    // Click on the 'View Report' button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
    cy.wait(2000);

    // Verify the data of the report
    cy.contains(expectedData.owner).should('exist');
    cy.contains(expectedData.ration).should('exist');
    cy.contains(expectedData.value).should('exist');
    
  });
});
