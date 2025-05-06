import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';
describe("Verifying data of Daily Feed Per Head(Feed Out)", () => { // Fixed the syntax error in the describe title
  let nav;
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });
  it("Veify the Commodity Calculator Report", () => {
    login_headstrom();
    // Navigate to the report
    cy.get(nav.Reports).click();
    cy.get(nav.Reports_Feeding).click();
    cy.get('#Item_JHS328').click();

    //select the Ration from the dropdown
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_ddValue').select('18');
    //type the ration code in the text box
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue').type('50');
    //click on the view report button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
    // Wait for report to load (adjust as needed)
    cy.wait(2000);

    //Assert the Title of the reports
    cy.contains('Commodity_Calculator').should('exist');
    cy.contains('Commodity').should('be.visible');
    cy.contains('%_of_Ration').should('be.visible');
    cy.contains('Pounds').should('be.visible');
    cy.contains('Pounds(10)').should('be.visible');   
    
  })
})