import 'cypress-xpath';
import { login } from "../../support/funcation.js";
describe('Creating an Charge Transfer', () => {
  let nav;
      beforeEach(() => {
        cy.fixture("jackson_Beta_navigation").then((jackson_Beta_navigation) => {
          nav = jackson_Beta_navigation;
        });
      });
      it('Should login, navigate to Inovice and and Create Apply Revenue', () => {
        login();

    // Navigate to Invoice and Charge transfer
   // Navigate to the Invoice section and ensure it's loaded
cy.get(nav.Invoice).should("exist").click();

// Navigate to the Charge Transfer section
cy.get(nav.Charge_Transfer).should("exist").click();

// Select 'From Lot' value (e.g., HAS)
cy.get('#txtFromLot')
  .click()
  .type('HAS{downarrow}{enter}');

// Select 'To Lot' value (e.g., HAS1)
cy.get('#txtToLot')
  .click()
  .type('HAS1{downarrow}{enter}');

// Click the Retrieve button to load data based on selected lots
cy.get('#btnRetrieve').click();

// Select the first column from the dropdown (possibly to filter or sort)
cy.get('#ddlColumns').select(1);

// Search for a specific value in the selected column (e.g., HAS)
cy.get('#txtSearch')
  .click()
  .type('HAS{downarrow}{enter}');

// Execute the search action
cy.get('#btnSearch').click();






      });

        });









