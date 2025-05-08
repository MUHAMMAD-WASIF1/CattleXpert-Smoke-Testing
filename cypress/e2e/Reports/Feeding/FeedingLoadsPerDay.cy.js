import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and Verifying the data of the Feeding Loads Per Day report", () => {
    login_headstrom();

    // Navigate to "Daily Feed Per Pen (Feed In)" report
    cy.get(nav.Reports).click();
    cy.get(nav.Reports_Feeding).click();
    cy.get(nav.R_Feeding_Loads_Per_Day).click();

    // Enter the Feed Load Number
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue"
    ).type("01");

    cy.wait(2000);

    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_txtValue"
    )
      .invoke("val", "04/17/2025")
      .trigger("input") // or 'change' if needed
      .trigger("blur");

    cy.wait(2000);

    // Select "Feed Call" from dropdown
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl08_ddValue"
    )
      .should("not.be.disabled")
      .select("1");

    // Wait until the dependent dropdown is enabled
    cy.get(
      'select[name="ctl00$ctl00$ContentPlaceHolder$RightSectionPlaceHolder$ReportViewer1$ctl04$ctl10$ddValue"]',
      { timeout: 10000 }
    )
      .should("not.be.disabled")
      .select("All");

    // Click "View Report"
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    cy.wait(5000);

    // Verify report headers
    cy.contains("Feed Loads Report").should("exist");
    cy.contains("Route: Feed Call").should("be.visible");
    cy.contains("Feeding #: 1 ").should("be.visible");
    cy.contains(" Ration Type: CNS starter ").should("be.visible");
    cy.contains(" Load Number: 1").should("be.visible");
    cy.contains("Commodity Load Amounts").should("be.visible");
    cy.contains("Commodity").should("be.visible");
    cy.contains("Load Amount").should("be.visible");
    cy.contains("% of Ration").should("be.visible");
    cy.contains("Scale Weight").should("be.visible");

    // Store expected values
    const expectedData = {
      Pen_0011_Total: "1070",
      Pen_0019_Total: "860",
      Pen_0016_Total: "1060",
      Pen_0023_Total: "1190",
      Pen_00A1_Total: "790",
      Pen_00A2_Total: "880",
      Pen_00A3_Total: "610",
      Pen_00A4_Total: "1330",
      Pen_00A5_Total: "1320",
      Pen_00A9_Total: "1320",
      Pen_00A8_Total: "1320",
      Pen_00A7_Total: "570",
    };

    // Navigate to Feed Call Pen Consumption
    cy.get(nav.Feed).click();
    cy.get(nav.Feed_Status).click();

    cy.wait(3000);

    // Enter date in the Feed Status screen
    cy.get("#txtDate").clear().type("04/17/2025").blur();

    cy.wait(2000);

    // Select route
    cy.get("#ddlRouteNum").select("Feed Call").should("have.value", "JHS1");

    //Select ration
    cy.get("#ddlRation").select("CNS starter");

    //Click on the "Refresh" button
    cy.get("#btnRefresh").click();
    cy.wait(2000);

    // Verify data in the Feed Status screen
    cy.contains(expectedData.Pen_0011_Total).should("exist");
    cy.contains(expectedData.Pen_0019_Total).should("exist");
    cy.contains(expectedData.Pen_0016_Total).should("exist");
    cy.contains(expectedData.Pen_0023_Total).should("exist");
    cy.contains(expectedData.Pen_00A1_Total).should("exist");
    cy.contains(expectedData.Pen_00A2_Total).should("exist");
    cy.contains(expectedData.Pen_00A3_Total).should("exist");
    cy.contains(expectedData.Pen_00A4_Total).should("exist");
    cy.contains(expectedData.Pen_00A5_Total).should("exist");
    cy.contains(expectedData.Pen_00A9_Total).should("exist");
    cy.contains(expectedData.Pen_00A8_Total).should("exist");
    cy.contains(expectedData.Pen_00A7_Total).should("exist");
  });
});
