import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  // Load navigation locators before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating Report and Verifying data in Variable Day Consumption Report.", () => {
    // Perform login
    login_headstrom();

    // Navigate to the Ration Worksheet Report
    cy.get(nav.Reports).click();
    cy.get(nav.Actual_Feed).click();
    cy.get(nav.ActualFeed_VariableDayConsumption).click();
    cy.wait(2000);

    // Set the report date
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue"
    ).type("03/12/2025)");
    cy.wait(2000);

    // Click the "View Report" button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();
    cy.wait(3000);

    // Verify the headers of the report
    cy.contains("Variable Day Consumption").should("exist");
    cy.contains("Pen").should("exist");
    cy.contains("Lot").should("exist");
    cy.contains("Gender").should("exist");
    cy.contains("Ratn").should("exist");
    cy.contains("Cur HD").should("exist");
    cy.contains("DOF").should("exist");
    cy.contains(/Pay\s*Wt/).should("exist");
    cy.contains("Yesterday").should("exist");
    cy.contains(/Seven Day\s*Avg/).should("exist");
    cy.contains("LTD").should("exist");
    cy.contains("Proj DOF").should("exist");
    cy.contains("Mrkt Wk").should("exist");

    // Store expected data values
    const expectedData = {
      Pen: "0002",
      Lot: "TL24-1",
      Pay_Wt: "549",
    };

    //Navigate to Processing module and Lot Details screen
    cy.get(nav.Processing).click();
    cy.get(nav.Lot_Details).click();
    cy.wait(2000);

    // Open the dropdown
    // Type 'TL24-1' into the dropdown
    cy.get(".ui-button").type("TL24-1").click();

    // Wait for the dropdown options to load
    cy.wait(2000);

    //Verify the values from summary tab
    cy.contains(expectedData.Pen).should("exist");
    cy.contains(expectedData.Lot).should("exist");
    cy.contains(expectedData.Pay_Wt).should("exist");
  });
});
