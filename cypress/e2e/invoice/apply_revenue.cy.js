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
               // Navigate to the "Invoice" section
        cy.get(nav.Invoice).click();
        
        // Click on the "Apply Revenue" option
        cy.get(nav.Apply_Revenue).click();
        
        // Click to open the "New Apply Revenue" form
        cy.get('#lnkNewApplyRevenue > [lang="en"]').click();
        
        // Open the owner number dropdown
        cy.get(':nth-child(2) > .custom-combobox > .ui-button').click();
        
        // Select the owner named "Adi Danna Ptnr" from the dropdown
        cy.get('#txtEditOwnerNumber').click().type('Adi Danna Ptnr{downarrow}{enter}');
        
        // Enter and select the invoice number "010101"
        cy.get('#txtEditInvoiceNumber').click().type('010101{downarrow}{enter}');
        
        // Click the save button to apply revenue
        cy.get('#btnApplyRevenueSave').click();
        
        // Select the search criteria (e.g., "Owner") from the dropdown
        cy.get('#ddlSearchCriteria').select(2);
        
        // Enter the owner name "Adi Danna Ptnr" for searching
        cy.get('#txtSearch').click().type('Adi Danna Ptnr{downarrow}{enter}');
        
        // Click the search button to execute the search
        cy.get('#btnSearch').click();
        cy.get('#btnSearchClear').click();
          });
        });









