import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

describe('Verify Daily Feed Per Pen (Feed In) and Feed Status Data', () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Verify data between Daily Feed Per Pen (Feed In) and Feed Status', () => {
    login_headstrom();

    // Navigate to "Daily Feed Per Pen (Feed In)" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Animal_health).click();
    cy.get(nav.R_Mortality).click();
    cy.get('#Item_JHS320').click({ force: true });


    // Select the 10th date from the calendar
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_ddValue').select('ALL');
    // Set 'Start Date' and 'End Date'
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue').type('4/1/2025');
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl07_txtValue').type('4/22/2025');

    // Set 'Owner' dropdown to 'ALL'
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl09_ddValue').select('ALL');

    // Set 'Group By Owner?' to True
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl11_ddValue').select('True');

    // Set 'Sort Sequence' to 'Date'
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl13_ddValue').select('Date');

    // Click 'View Report' button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();

   // Wait for report to load (adjust as needed)

    cy.wait(2000);
    // Assert table headers
    const expectedHeaders = [
      'Animal', 'Lot', 'Lot Class', 'Buyer', 'Rider', 'Home Pen',
      'Date', 'Weight', 'From Pen', 'Pen Type', 'Last Treated',
      'Origin', 'DOF', 'Total Cost', 'Visual Tag'
    ];
    // Verify that the report contains "Buy", "Pen", "Product", "Total Cost" "Head Count",
    cy.contains('HF').should('be.visible');
    cy.contains('Breather').should('be.visible');
    cy.contains('ABC-02').should('be.visible');
    cy.contains('SAW01').should('be.visible');
    cy.contains('KS01').should('be.visible');
    cy.contains('4/14/2025').should('be.visible');
    cy.contains('500.000').should('be.visible');
    cy.contains('KS01').should('be.visible');
    //cy.contains('R').should('be.visible');

 // Navigate to "Animal Detail" Screen
 cy.get(nav.health).click();
 cy.get(nav.Animal_Details).click();
 
 //Verify the data in the "Animal Detail" screen
 cy.get('#txtAnimal').type('ABC-02');
 cy.get(':nth-child(1) > .red > span').click();

 //Verify the data in the report details 
 cy.contains('HF').should('be.visible');
 cy.contains('SAW01').should('be.visible');
 cy.contains('KS01').should('be.visible');
 cy.contains('4/14/2025').should('be.visible');
 cy.contains('500').should('be.visible');
 cy.contains('KS01').should('be.visible');

 //Navigate to the Health in Animal Detail screen      
 cy.get('#Health > a').click();
 //Verify the Breather data in the Health screen
 cy.get('#txtHDeadReason').click();
 });
});
