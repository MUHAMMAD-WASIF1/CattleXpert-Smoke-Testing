import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and Verifying data of the Payables Report", () => {
    login_headstrom();

    // Navigate to the "Payables" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Cattle).click();
    cy.get(nav.R_Cattle_Payables).click();
    cy.wait(2000);

    //  //Enter the Start Date
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue"
    ).type("1/1/2025");

    cy.wait(2000);

    //   //Enter the End Date
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_txtValue"
    ).type("4/15/2025");

    //Click the "View Report" button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();
    cy.wait(4000);

    // Verify the headers of the report
    cy.contains("Feeder Cattle Payables Report").should("exist");
    cy.contains(/Buy\s*Number/).should("exist");
    cy.contains(/Total \s*Buy Cost/).should("exist");
    cy.contains(/Total Down\s*Payment/).should("exist");
    cy.contains(/Total\s*Payment/).should("exist");
    cy.contains("Freight").should("exist");
    cy.contains(/Head\s*Count/).should("exist");
    cy.contains("Vendor").should("exist");

    // Store expected values
    const expectedData = {
      Head_Count: "99",
      Shipments: "0",
      Total_Buy_Cost: "105939.90",
    };

    //Navigate to Procurement and Cattle Board screen
    cy.get(nav.Procurement).click();
    cy.get(nav.Cattle_Receiving).click();
    cy.wait(2000);

    // Select the "Buy No." option from the dropdown
    cy.get("select#ddlSearchCriteria")
      .should("be.visible") // ensure it's visible
      .should("not.be.disabled") // ensure it's not disabled
      .should("contain", "Buy No.") // confirm option exists by text
      .select("Buy No.") // select by visible text
      .should("have.value", "CATL_BUY_NBR");

    // Enter the "Buy No." value in the search box
    cy.get("#txtSearch").type("H100182");

    //click on the search button
    cy.get("#btnSearch").click();

    //Click on the show all button
    cy.get("#cattleBuyChkAll").click();
    
    //click on the search button
    cy.get("#btnSearch").click();

    cy.wait(2000);
    cy.get('[aria-describedby="productGridView_CATL_BUY_NBR"]').click(); // Click on the first row of the grid

    // Verify data in Animal detail screen
    cy.contains(expectedData.Head_Count).should("exist");
    cy.contains(expectedData.Shipments).should("exist");
    cy.scrollTo("center"); // Scroll to the center of the page
    cy.get('#divCost > .pd_5 > .icon').click();
   
  });
});
