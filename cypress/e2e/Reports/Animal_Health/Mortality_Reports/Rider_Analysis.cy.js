import { login_headstrom } from "../../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and Verifying the data of Rider Analysis report", () => {
    login_headstrom();

    // Navigate to "Rider Analysis" report
    cy.get(nav.Reports).click();
    cy.get('li#Item_JHS177 > a')
      .should('contain.text', 'Animal Health')
      .trigger('mouseover');

    // Hover over "Mortality Reports"
    cy.get('li#Item_JHS192 > a')
      .should('contain.text', 'Mortality Reports')
      .trigger('mouseover');

    // Click on "Rider Analysis"
    cy.get('li#Item_JHS323 > a')
      .should('contain.text', 'Rider Analysis')
      .click();

    cy.wait(2000);
    // cy.get(nav.Mortality_Reports_Rider_Analysis).click();

     // Wait for the report to load
     cy.wait(2000);

         //Select the start date and end date

   cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue')
    .invoke("val", "4/1/2024 ")
    .trigger("input") // or 'change' if needed
    .trigger("blur");

    cy.wait(2000); // Wait for to load

// Select the end date
cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_txtValue')
    .invoke("val", "4/30/2025")
    .trigger("input") // or 'change' if needed
    .trigger("blur");    

    // Click on the view report button
cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00')
.click();

// Wait for report to load (adjust as needed)
cy.wait(3000);


});
});
