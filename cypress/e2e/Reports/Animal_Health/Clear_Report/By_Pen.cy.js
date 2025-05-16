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
        cy.get(nav.By_Pen).click();

        // Pen Number dropdown select
        // cy.get('select').first().select('0001'); // Agar page par sirf ek select hai
        // Agar multiple select hain to aap specific selector use karein, jaise:
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04 select').select('1');

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_ddValue').select('1');

       cy.get('.ui-datepicker-trigger').click();
       cy.get(".ui-datepicker-month").select("Apr");
       cy.get(".ui-datepicker-calendar").contains("14").click();
       cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
        // Invoke and store values
        // let Name, ShortName, Company;

        // cy.get('td').contains("Adam Jackson").invoke('text').then((text) => {
        //     Name = text.trim();
        // });

        // cy.get('td').contains("AJ").first().invoke('text').then((text) => {
        //     ShortName = text.trim();
        // });
        // cy.get('td').contains("Yes").first().invoke('text').then((text) => {
        //     Company = text.trim();
        // });

        // // Navigate to "System Setup > Profile >  Carrier List" Module
        // cy.get(nav.System_Setup).click();
        // cy.get(nav.Profile).click();
        // cy.get(nav.Carrier).click();

        // cy.get('#JHS267 > [aria-describedby="productGridView_PRFL_COMP_NAME"]').click();

        // cy.contains(Name).should("be.visible");
        // cy.contains(ShortName).should("be.visible");
        // cy.contains(Company).should("be.visible");

        });
    });