import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and verifying the Lot Analysis by Date Report", () => {
    login_headstrom();

    // Navigate to the "Hospital Activity" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Animal_health).click();
    cy.get(nav.R_LotAnalysisByDate).click();
    cy.wait(2000);

    // Select the "Analysis Date"
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue"
    ).type("04/14/2025");

    // Click the "View Report" button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    // Wait for the report to load
    cy.wait(5000);

    //Verify the key headers of the report
    cy.contains("Lot Analysis By Date").should("exist");
    cy.contains("Lot").should("exist");
    cy.contains(/Pay\s*Wt/).should("exist");
    cy.contains("DOF").should("exist");
    cy.contains(/Pur\s*Hd/).should("exist");
    cy.contains(/Cur\s*Hd/).should("exist");
    cy.contains("Cur Hosp").should("exist");
    cy.contains("Tot Hosp").should("exist");
    cy.contains("Dead").should("exist");
    cy.contains("Buller").should("exist");
    cy.contains("Realizer").should("exist");

    // Store expected values
    const expectedData = {
      Pay_Wt: "600",
     Head_Count: "100",
      Dead: "0",
      Realizers: "0"
    };

    //Navigate to Processing module and Lot Details screen   
    cy.get(nav.Processing).click();
    cy.get(nav.Lot_Details).click();
    cy.wait(4000); 

    // Type Lot Number in the dropdown
    cy.get(".ui-button").type("ANH01"); // Type the value
    cy.get(".ui-menu-item").contains("ANH01").click();
    cy.wait(3000);

    // Verify the Pay_Wt
    cy.contains(expectedData.Pay_Wt).should("exist");
    // Navigate to the Summary tab screen
    cy.get("#btnSummary").click();

    // Wait for the report to load
    cy.wait(2000);

    // Step 1: Select "Specify Dates" option
    cy.get('[value="S"]').click(); // Select the "Specify Dates" radio button

    // Step 2: Set the "From" date
    cy.get("#txtLDSFromDate") // Replace with the actual selector for the "From" date field
      .clear() // Clear any existing value
      .type("04/14/2025"); // Enter the start date

    // Step 3: Set the "To" date
    cy.get("#txtLDSToDate") // Replace with the actual selector for the "To" date field
      .clear() // Clear any existing value
      .type("04/14/2025"); // Enter the end date

    //verify the Head Count from the  Summary tab
    cy.get('#lblHeadDays').click();

     //verify the Data from the Lot details screen
    cy.contains(expectedData.Head_Count).should("be.visible");
    cy.contains(expectedData.Dead).should("be.visible");
    cy.contains(expectedData.Realizers).should("be.visible");

    // Wait for the report to load
    cy.wait(3000);

    //Close the summary tab
    cy.get(
      ".ui-dialog-titlebar > .ui-button > .ui-button-icon-primary"
    ).click();

    // Wait for the report to load
    cy.wait(2000);

   
  });
    
});
