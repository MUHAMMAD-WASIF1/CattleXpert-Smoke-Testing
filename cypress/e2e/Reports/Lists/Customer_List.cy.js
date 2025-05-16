import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  // Load navigation paths before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and Verifying data of Customer List Report", () => {
    // Step 1: Log in
    login_headstrom();

    // Step 2: Navigate to Buyer List Report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Lists).click();
    cy.get(nav.R_CustomerList).click();

    // Enter the wait
    cy.wait(3000);

    // Step 3: Verify key headers in the buyer List Report
    cy.contains("Customer List").should("exist");
    cy.contains("Name").should("exist");
    cy.contains("Short Name").should("exist");
    cy.contains("Customer Number").should("exist");
   
    // Step 4: Define expected data values to verify
    const expectedData = {
      Name: "Bar G Ranch",
      Short_Name: "BGR",
      Customer_Number: "00000000",
     
    };

    // Step 5: Navigate to System Setup > Profile >Buyer to cross-check the data
    cy.get(nav.System_Setup).click();
    cy.get(nav.Profile).click();
    cy.get(nav.Customer).click();
    cy.wait(2000);


    // // Step 6: Verify expected report data in the buyer screen
    // cy.contains(expectedData.Name).should("exist");
    // cy.contains(expectedData.Short_Name).should("exist");
    // cy.scrollTo("center");
  });
});
