import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("Verify Owner List Report data", () => {
  let nav;

  // Load navigation paths before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and Verifying data of Buyer List Report", () => {
    // Step 1: Log in
    login_headstrom();

    // Step 2: Navigate to Buyer List Report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Lists).click();
    cy.get(nav.R_BuyerList).click();

    // Enter the wait
    cy.wait(2000);

    // Step 3: Verify key headers in the buyer List Report
    cy.contains("Buyer List").should("exist");
    cy.contains("Name").should("exist");
    cy.contains("Short Name").should("exist");
    cy.contains("Buyer Nick Name").should("exist");
    cy.contains("Commission/CWT").should("exist");

    // Step 4: Define expected data values to verify
    const expectedData = {
      Name: "Lance Reed",
      Short_Name: "LR",
      Nick_Name: "Lans",
      Commission: "10.000",
    };

    // Step 5: Navigate to System Setup > Profile >Buyer to cross-check the data
    cy.get(nav.System_Setup).click();
    cy.get(nav.Profile).click();
    cy.get(nav.Buyer).click();
    cy.wait(2000);

    cy.get(
      '#JHS266 > [aria-describedby="productGridView_PRFL_COMP_NAME"]'
    ).click(); // Click on the first row of the grid
    cy.wait(2000);

    // Step 6: Verify expected report data in the buyer screen
    cy.contains(expectedData.Name).should("exist");
    cy.contains(expectedData.Short_Name).should("exist");
    cy.scrollTo("center");
  });
});
