import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and verifying data on Treatment By Days on Feed-Lot Reports", () => {
    login_headstrom();

    // Navigate to the "Hospital Activity" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Animal_health).click();
    cy.get(nav.R_AnimalHealth_TreatmentByDaysOnFeed_Lot).click();
    cy.wait(2000);

    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_ddValue"
    )
      .should("be.visible")
      .select("1"); // select by value

    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_ddValue"
    )
      .select("SAW01")
      .should("have.value", "2190");

    //Click the "View Report" button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    // Verify the key headers of the report
    cy.contains("DOF").should("exist");
    cy.contains("Resp").should("exist");
    cy.contains("Digest").should("exist");
    cy.contains("Other").should("exist");
    cy.contains("Temp > 104").should("exist");
    cy.contains("Pulls").should("exist");
    cy.contains("RePulls").should("exist");
    cy.contains("ReTreats").should("exist");
    cy.contains("Deads").should("exist");
    cy.contains("Total Pulls").should("exist");

    // Store expected values
    const expectedData = {
      Pulls: "0",
      RePulls: "0",
    };

    //Navigate to Health module and Animal Details screen
    cy.get(nav.health).click();
    cy.get(nav.health_Animal_Details).click();
    cy.wait(2000);

    // Clikck the "Lot Pen Lookup"
    cy.get(".formwpr.pd_10 > .mrg-0 > .relative > #lnkLotPenLookup")
      .should("be.visible")
      .click({ force: true });
    // Wait for the report to load
    cy.wait(2000);

    cy.get("#ddlALPLot").select("SAW01");

    // Verify data in Animal detail screen
    cy.contains(expectedData.Pulls).should("exist");
    cy.contains(expectedData.RePulls).should("exist");
  });
});
