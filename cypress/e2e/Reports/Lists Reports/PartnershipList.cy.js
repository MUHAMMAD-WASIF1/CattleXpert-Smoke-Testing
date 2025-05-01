import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  // Load navigation fixture before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and Verifying data of PartnerShip List Report", () => {
    // Log in to the application
    login_headstrom();

    // Navigate to "Customer Closeout" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Lists).click();
    cy.get(nav.R_List_PartnershipList).click();

    // Wait for the report to load
    cy.wait(2000);

   

});
 
});
