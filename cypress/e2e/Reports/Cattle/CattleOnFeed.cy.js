import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and Verifying data of the Cattle on Feed Report", () => {
    login_headstrom();

    // Navigate to the "Cattle On Feed" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Cattle).click();
    cy.get(nav.R_Cattle_CattleOnFeed).click();
    cy.wait(2000);

     //Enter the Start Date
     cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue')
     .type("04/1/2025");
  
      //Enter the End Date
      cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_txtValue')
      .type("04/14/2025");
  

    //Click the "View Report" button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();
    cy.wait(3000);

     // Verify the headers of the report
     cy.contains("Cattle on Feed").should("exist");
     cy.contains("Balance Forward").should("exist");
     cy.contains("Placements").should("exist");
     cy.contains("Shipments").should("exist");
     cy.contains("Dead").should("exist");
     cy.contains("Total").should("exist");

    // Store expected values
    const expectedData = {
        Dead: "0",
        Shipments: "0",
    };

    //Navigate to Dashboard and Cattle Board screen
    cy.get(nav.Dashboard).click();
    cy.get(nav.Cattle_Board).click();
    cy.wait(2000);

  
    // Verify data in Animal detail screen
    cy.contains(expectedData.Dead).should("exist");
    cy.contains(expectedData.Shipments).should("exist");
  });
});
