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

  it("Generating and verifying data for Active Home Pens Reports", () => {
    // Log in to the application
    login_headstrom();

    // Navigate to "Active Home Pens" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Pens).click();
    cy.get(nav.R_Pen_ActiveHomePens).click();

    // Wait for the report to load
    cy.wait(2000);

    // Enter the value from the dropdown
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_ddValue"
    ).select("2");

    // Click the "View Report" button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    // Wait for the report to load
    cy.wait(3000);

    //Verify the key headers of the report
    cy.contains("Active Home Pens").should("exist");
    cy.contains("Pen").should("exist");
    cy.contains("Gender").should("exist");
    cy.contains("Capacity").should("exist");
    cy.contains(/Current\s*Head/).should("exist");
    cy.contains("Add").should("exist");
    cy.contains("Zone").should("exist");
    cy.contains("Weight").should("exist");
    cy.contains("DOF").should("exist");

    // Store expected values
    const expectedData = {
      Gender: "Heifer",
      Capacity: "0",
      Head: "49",
      DOF: "223",
    };

    //Navigate to Processing module and Lot Details screen
    cy.get(nav.Processing).click();
    cy.get(nav.Pen_Details).click();
    cy.wait(2000);

    // Type the pen number in the dropdown
    cy.get("#txtPenNumber")
      .should("be.visible") // Ensure it's in the DOM
      .type("0002");

    // Click the refresh button
    cy.get("#btnRefresh").click();

    // Wait for the report to load
    cy.wait(2000);

    //verify the Data from the Lot details screen
    cy.contains(expectedData.Gender).should("exist");
    cy.contains(expectedData.Capacity).should("exist");
    cy.contains(expectedData.Head).should("exist");
    cy.contains(expectedData.DOF).should("exist");
  });
});
