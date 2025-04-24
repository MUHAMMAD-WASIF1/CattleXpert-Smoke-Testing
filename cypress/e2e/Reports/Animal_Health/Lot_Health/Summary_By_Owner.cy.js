import { login_headstrom } from '../../../../support/funcation';
import 'cypress-xpath';

describe('Verify Summary by owner Report Lot summary data', () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Verify data between Summary by owner Reports and Summary Detail', () => {
    login_headstrom();

    // Navigate to "Daily Feed Per Pen (Feed In)" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Animal_health).click();
    cy.get(nav.Lot_Health).click();
    cy.get(nav.Summary_By_Owner).click();

    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_ddValue').select("All");
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05 > .ui-datepicker-trigger').click();
    cy.get('.ui-datepicker-calendar').contains('1').click();
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl07 > .ui-datepicker-trigger').click();
    cy.get('.ui-datepicker-calendar').contains('20').click();
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();

    // Verify that the report contains "Buy", "Pen", "Product", "Total Cost" "Head Count", 
    cy.contains('LTE02').should('be.visible');
    cy.contains('Te02').should('be.visible');
    cy.contains('500').should('be.visible');
    cy.contains('Bloat').should('be.visible');
    cy.contains('0').should('be.visible');
    // cy.contains('1').should('be.visible');
    cy.contains('0').should('be.visible');
    cy.contains('0').should('be.visible');

    // Navigate to "Daily Feed Per Pen (Feed In)" report
    cy.get(nav.health).click();
    cy.get(nav.Animal_Details).click();
  });
});