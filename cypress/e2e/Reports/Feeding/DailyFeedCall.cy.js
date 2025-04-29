import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and Verifying the data of daily feed call report", () => {
    login_headstrom();

    // Navigate to "Daily Feed Per Pen (Feed In)" report
    cy.get(nav.Reports).click();
    cy.get(nav.Reports_Feeding).click();
    cy.get(nav.R_Feeding_DailyFeedCall).click();

     // Wait for the report to load
     cy.wait(2000);

     // Enter the Activity date
     cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue')
     .type("04/17/2025");

     // Click on the 'View Report' button
     cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00')
    .click();
     
    // Wait for the report to load
    cy.wait(3000);

     // Verify the key headers of the report
     const expectedHeaders = [
        "PEN",
        "Head Count",
        "Ration",
        "Actual Call",
        "Plan Call",
        "Lbs/HD",
        "Fed",
        "Var/Lbs/HD"
      ];

     // Store expected values
    const expectedData = {
        PEN: '0002',
        Head_Count: '51',
        Ration: 'M2',
        Actual_Call: '1580',
        Fed: '1580'
    };

      //Navigate to Feed and Feed Call Pen Consumption screen
      cy.get(nav.Feed).click();
      cy.get(nav.Feed_Call_Pen_Consumption).click();

       // Wait for the report to load
        cy.wait(3000);
      
        // Verify data of the report in the Feed Call Pen Consumption screen
        cy.contains(expectedData.PEN).should('exist');
        cy.contains(expectedData.Head_Count).should('exist');
        cy.contains(expectedData.Ration).should('exist');
        cy.contains(expectedData.Actual_Call).should('exist');
        cy.contains(expectedData.Fed).should('exist');

});
});
