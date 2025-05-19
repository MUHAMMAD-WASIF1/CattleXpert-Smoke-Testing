import { login_headstrom } from "../../../../support/funcation";
import 'cypress-xpath';
describe("NAVIGATION TO Reports > Animal Health > Clear Report > By Pen and Verify", () => {
    let nav;
    beforeEach(() => {
        cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
            nav = headstrom_navigation;
        });
    });

    it("Generating and Verifying the By Pen Report from Animal Treatment", () => {
        login_headstrom();

        // Navigate to "Carrier List" report
        cy.get(nav.Reports).click();
        cy.get(nav.R_Animal_health).click();
        cy.get(nav.Clear_Report).click();
        cy.get('#Item_JHS193').click();

    // Lot Number dropdown select
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_ddValue').select('JHF25-2');

    // Select the cleared or Uncleared
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_ddValue').select('1');

    // Select the date
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl08_txtValue').type('4/17/2025');

    // Click on the View Report button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
    // Wait for the report to load
    cy.wait(2000);
    


    })
})