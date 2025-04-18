import { login } from "../../support/funcation.js";

describe("Invoice Processing Automation", () => {
  let nav;
  beforeEach(() => {
    cy.fixture("jackson_Beta_navigation").then((jackson_Beta_navigation) => {
      nav = jackson_Beta_navigation;
    });
  });

  it("User should navigate to the Invoice Processing screen and proceed", () => {
    login();

    // Navigate to Invoice and Invoice Processing
    cy.get(nav.Invoice).should("exist").click();
    cy.get(nav.Invoice_Processing).should("exist").click();

    // Select Feedyard as Jackson_Beta
    cy.get("#ddlLocation").should("exist").select("Jackson_Beta");

    // Type "All" into the Lot Number input field
    cy.get("#txtLotNumber").should("exist").clear().type("All{enter}");

    // Enter the date range for the invoice
    cy.get("#txtToDate").should("exist").clear().type("11/30/2024");

    // Click on the Create Invoice button
    cy.get("#btnCreate").should("exist").click();

    // Handle the alert and verify its content
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Invoice Created Successfully.");
    });
  });
});
