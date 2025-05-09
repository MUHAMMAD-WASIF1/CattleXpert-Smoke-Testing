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

  it("Generating and Verifying data of  Arrival Notice Report", () => {
    // Log in to the application
    login_headstrom();

    // Navigate to "Customer Closeout" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Customer).click();
    cy.get(nav.R_Customer_ArrivalNotice).click();

    //Enter the Start Date
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04 > .ui-datepicker-trigger"
    ).click();
    cy.get(".ui-datepicker-month").select("Apr");
    cy.get(".ui-datepicker-calendar").contains("1").click();

    //Enter the End Date
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06 > .ui-datepicker-trigger"
    ).click();
    cy.get(".ui-datepicker-month").select("Apr");
    cy.get(".ui-datepicker-calendar").contains("30").click();

    // Click on the 'View Report' button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    // Click on the 'View Report' button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    // select the Owner
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl08_ddValue"
    ).select("ALL");

    // select the Lot Number
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl10_ddValue"
    ).select("All", { force: true });

    // Click on the 'View Report' button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    // Wait for the report to load
    cy.wait(3000);

    // Verify the headers of the report
    cy.contains("Arrival Notice").should("exist");
    cy.contains(/Process\s*Date/).should("exist");
    cy.contains("Buy").should("exist");
    cy.contains("Lot").should("exist");
    cy.contains(/%\s*Owned/).should("exist");
    cy.contains("Head").should("exist");
    cy.contains("Gender").should("exist");
    cy.contains(/%\s*Shrink/).should("exist");

    // Store expected values
    const expectedData = {
      Head: "500",
      Avg_Pay_Wt: "500",
      Shrink: "0.0000",
    };


    //Navigate to Procurement module and Cattle Receiving screen
    cy.get(nav.Procurement).click();
    cy.get(nav.Cattle_Receiving).click();
    cy.wait(3000);

    //Enter the search
    cy.get('#ddlSearchCriteria')
    .select('Buy No.');
    cy.wait(2000);

    //Enter the buy number
    cy.get('#txtSearch')
    .type('J101728')
    cy.get('#btnSearch').click();
    cy.wait(2000);

    // Verify data in the Cattle Receiving screen

    cy.contains(expectedData.Head).should("exist");
    cy.contains(expectedData.Avg_Pay_Wt).should("exist");
    cy.contains(expectedData.Shrink).should("exist");

  });
});
