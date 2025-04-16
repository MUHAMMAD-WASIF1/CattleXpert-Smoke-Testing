import 'cypress-xpath';
import { login } from "../../support/funcation.js";
describe('Creating an Apply Revenue', () => {
  let nav;
      beforeEach(() => {
        cy.fixture("jackson_Beta_navigation").then((jackson_Beta_navigation) => {
          nav = jackson_Beta_navigation;
        });
      });
  it('Should login, navigate to Inovice and and Create Apply Revenue', () => {
    login();
        // Visit the login page
        cy.get(nav.Invoice).click();
        cy.get(nav.Apply_Revenue).click();
        cy.get('#lnkNewApplyRevenue > [lang="en"]').click();
        cy.get(':nth-child(2) > .custom-combobox > .ui-button').click();
        cy.get('#txtEditOwnerNumber').click().type('Adi Danna Ptnr{downarrow}{enter}');
        cy.get('#txtEditInvoiceNumber').click().type('010101{downarrow}{enter}');
        cy.get('#btnApplyRevenueSave').click();




        
  });
});









