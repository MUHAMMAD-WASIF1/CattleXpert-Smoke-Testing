import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;
  let processingSummaryData = {}; // Declare and initialize processingSummaryData

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and Verify the data for the report Processing charges", () => {
    login_headstrom();

    // Navigate to "Daily Feed Per Pen (Feed In)" report
    cy.get(nav.Reports).click();
    cy.get(nav.Daily_Reports).click();
    cy.get(nav.Daily_Report_Processing_Charges).click();

    // Enter the Activity date
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue"
    ).type("4/28/2025");

    // Click on the 'View Report' button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    // Wait for the report to load
    cy.wait(2000);

    // Verify the key headers of the report
    const expectedHeaders = [
      "Lot",
      "Lot ID",
      "Date",
      "Head",
      "Price",
      "Quantity",
      "UOM",
      "Charge",
      "Description",
    ];

    // Wait for the report to load
    cy.wait(2000);

    // Extract data from "Charge Summary Owner"
    cy.contains("td", "Yardage")
      .invoke("text")
      .then((text) => {
        processingSummaryData.processType = text.trim(); // Assign value to processingSummaryData
      });

    cy.contains("td", "4/28/2025")
      .invoke("text")
      .then((text) => {
        processingSummaryData.value1 = text.trim(); // Assign '323.00' to value1
      });

    cy.contains("td", "323.00")
      .invoke("text")
      .then((text) => {
        processingSummaryData.value2 = text.trim(); // Assign '323.00' to value1
      });

    cy.contains("td", "145.35")
      .invoke("text")
      .then((text) => {
        processingSummaryData.value3 = text.trim(); // Assign '145.35' to value2
      });

    // Navigate to Processing module and Lot Details screen
    cy.get(nav.Processing).click();
    cy.get(nav.Lot_Details).click();
    cy.wait(2000);

    // Type 'BL24-2' into the dropdown and select it
    cy.get(".ui-button").type("BL24-2"); // Type the lot number
    cy.get(".ui-menu-item").contains("BL24-2").click();
    cy.wait(2000);

    // Navigate to the Summary tab
    cy.get("#btnSummary").click();
    cy.wait(2000);

    // Step 1: Select "Specify Dates" option
    cy.get('[value="S"]').click(); // Select the "Specify Dates" radio button

    // Step 2: Set the "From" date
    cy.get("#txtLDSFromDate") // Replace with the actual selector for the "From" date field
      .clear() // Clear any existing value
      .type("04/28/2025"); // Enter the start date
    cy.wait(2000);

    // Step 3: Set the "To" date
    cy.get("#txtLDSToDate") // Replace with the actual selector for the "To" date field
      .clear() // Clear any existing value
      .type("04/28/2025"); // Enter the end date

    // Click the "OK" button to apply the date filter
    cy.get('[style="margin-top:-12px"] > :nth-child(1)').click();
    cy.wait(3000);

    // Click the "Cost" tab
    cy.get("#btnCost").click();

    // Verify data in Lot Summary Tab of the "Processing Charges" report
    cy.contains("td", processingSummaryData.processType).should("exist");
    cy.contains("td", processingSummaryData.value1).should("exist");
    cy.contains("td", processingSummaryData.value2).should("exist");
    cy.contains("td", processingSummaryData.value3).should("exist");
  });
});
