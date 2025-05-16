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
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue')
    .type("04/14/2025");
   
    // Click the "View Report" button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00')
    .click();

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
    

    // // Store expected values
    // const expectedData = {
    //   From_Pen: "0002",
    //   To_Pen: "0002",
    //   Lot: "TL24-2",
    // };

    // //Navigate to Health module and Animal Details screen
    // cy.get(nav.Health).click();
    // cy.get(nav.Health_Animal_Deatail).click();

    // //Enter the Animal ID in the search box
    // cy.get("#txtAnimal").type("ASDFGHJ-1", { force: true });
    // cy.get("#txtPayWeight").click();

    // //Verify the data of the report in the Animal Details screen

    // cy.contains(expectedData.From_Pen).should("exist");
    // cy.contains(expectedData.To_Pen).should("exist");
    // cy.contains(expectedData.Lot).should("exist");
  });
});
