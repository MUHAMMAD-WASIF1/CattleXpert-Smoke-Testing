import { login } from "../../support/funcation.js";

describe("Creating an Apply Revenue", () => {
  let nav;
  beforeEach(() => {
    cy.fixture("jackson_Beta_navigation").then((jackson_Beta_navigation) => {
      nav = jackson_Beta_navigation;
    });
  });

  it("Should select dropdown value, pick a date range, and proceed", () => {
    login();

    // Navigate to Invoice and Charge Entry
    cy.get(nav.Invoice).should("exist").click();
    cy.get(nav.Charge_Entry).should("exist").click();

    // Click on the Lot Number dropdown and type the lot number
    cy.get("#txtLotNumber")
      .should("exist")
      .click()
      .type("0811{downarrow}{enter}")
      .clear()
      .type("LOT37{downarrow}{enter}")
      .clear()
      .type("NICKTEST{downarrow}{enter}");

    // On the "Show Record" Click on the Since Last Invoice radio button
    cy.get("#rbtnLastInvoice").should("exist").click().wait(2000);

    // On the "Show Record" Click on the Entire History radio button
    cy.get("#rbtnAll").should("exist").click().wait(2000);

    // On the "Show Record" Click on the Specify Dates radio button
    cy.get("#rbtnPeriod").should("exist").click().wait(2000);

    // Enter date range
    cy.get("#txtFromDate")
      .should("exist")
      .click()
      .type("04/01/2025")
      .wait(2000);
    cy.get("#txtToDate").should("exist").click().type("04/15/2025").wait(2000);

    // Enter search criteria for the below grid
    cy.get("#ddlColumns").select(2);
    cy.get("#txtSearch").click().type("Adi Danna Ptnr{downarrow}{enter}");
    cy.get("#btnSearch").click();
  });
});
