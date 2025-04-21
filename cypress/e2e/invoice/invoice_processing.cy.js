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

    // Retrieve the "From Date" and calculate the "To Date" as one day ahead
    cy.get("#txtFromDate")
      .should("exist")
      .invoke("val")
      .then((fromDate) => {
        // Parse the "From Date" and add one day
        const fromDateObj = new Date(fromDate);
        fromDateObj.setDate(fromDateObj.getDate() + 1);

        // Format the "To Date" as MM/DD/YYYY
        const toDate = fromDateObj
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, "/");

        // Set the "To Date" field
        cy.get("#txtToDate").should("exist").clear().type(toDate);
      });

    // Click on the Create Invoice button
    cy.get("#btnCreate").should("exist").click();

    // Handle the alert and verify its content
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Invoice Created Successfully.");
    });
  });
});
