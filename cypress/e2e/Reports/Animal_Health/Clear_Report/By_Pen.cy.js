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
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04 select').select('2');

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_ddValue').select('1');

       cy.get('.ui-datepicker-trigger').click();
       cy.get(".ui-datepicker-month").select("Mar");
       cy.get(".ui-datepicker-calendar").contains("5").click();
       cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
        // Invoke and store values
        let Animal, Lot, Current_Pen, Treatment_Date, Treatment;

        cy.get('td').contains("BL01099JHF24-3").invoke('text').then((text) => {
            Animal = text.trim();
        });

        cy.get('td').contains("JHF24-3").first().invoke('text').then((text) => {
            Lot = text.trim();
        });
        cy.get('td').contains("0002").first().invoke('text').then((text) => {
            Current_Pen = text.trim();
        });
        cy.get('td').contains("03/05/2025").first().invoke('text').then((text) => {
            Treatment_Date = text.trim();
        });
        cy.get('td').contains("Observe").first().invoke('text').then((text) => {
            Treatment = text.trim();
        });

        //Navigate to Health module and Animal Details screen
         cy.get(nav.health).click();
        cy.get(nav.health_Animal_Details).click();
        cy.wait(2000);

        cy.get('#txtAnimal').type('BL01099JHF24-3');
        cy.get('#General > a').click();

        // Directly verify Animal Details fields with expected values
        cy.get('#txtAnimal').should('have.value', 'BL01099JHF24-3');
        cy.get('#txtGLot').should('have.value', 'JHF24-3');
        cy.get('#txtCurrentPen').should('have.value', '0002');
        cy.get('#txtGSetupDate').should('have.value', '03/05/2025');

        cy.get('#Health > a').click();

        cy.get('#gview_PullGridView').within(() => {
        cy.contains('td', Treatment).should('be.visible'); // Verify Lot Number in grid
      });
    });
});