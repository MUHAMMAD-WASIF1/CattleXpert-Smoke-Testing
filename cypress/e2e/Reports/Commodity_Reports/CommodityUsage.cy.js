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

  it("Generating and Verifying data of the Commodity Commodity Usage Report", () => {
    // Log in to the application
    login_headstrom();

    // Navigate to "Customer Closeout" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Commodity).click();
    cy.get(nav.R_Commodity_CommodityUsage).click();

    //Enter the Start Date
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue"
    ).type("03/23/2025");

    //Enter the End Date
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue"
    ).type("04/23/2025");

    // Click on the 'View Report' button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    // Wait for the report to load
    cy.wait(3000);

    // Verify the headers of the report
    cy.contains("Commodity").should("exist");
    cy.contains("Date Fed").should("exist");
    cy.contains("Pounds Fed").should("exist");
    cy.contains("Avg Cost/Pound*").should("exist");
    cy.contains("Cost").should("exist");

     // Store expected values
     const expectedData = {
      Commodity: "Corn",
    
    };

    //Navigate to the System Setup and Commodity Cost screen
    cy.get(nav.System_Setup).click();
    cy.get(nav.System_Setup_Feed).click();
    cy.get(nav.System_Setup_Commodity_Cost).click();
    cy.wait(3000);

    //Enter the Commodity Name
    cy.get("#txtCommoditySeacrh").type("Corn", { force: true });
    cy.wait(3000);
    cy.get("#btnAutoFillSearch").click({ force: true });

    // Set the effective date to the end date of the report
    const effectiveDate = "04/23/2025"; 
    cy.get('#txtCommodityInEffective')
      .should('be.visible')
      .clear({ force: true })
      .type(effectiveDate, { force: true })
      .blur();

      // Verify data in System Setup Feed Cost screen
    cy.contains(expectedData.Commodity).should("exist");
  });
});
