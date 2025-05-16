const { describe } = require("mocha");
import "cypress-xpath";
import "cypress-real-events/support";

Cypress.on("uncaught:exception", (err, runnable) => {
  if (
    err.message.includes("$ is not defined") ||
    err.message.includes("jquery_lang_js is not defined")
  ) {
    return false;
  }
});

describe("Reports Module", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.reload();
  });

  it("Report > Animal Health > Mortality Reports > Analysis", () => {
    cy.Login();
    cy.dbsetup();

    // Hover over "Reports"
    cy.get("#Item_JHS44 > .level0parent").trigger("mouseover").click();

    // Hover over "Animal Health"
    cy.get("#Item_JHS221").trigger('mouseover')

    // Select the second one
    cy.get("#Item_JHS252").trigger('mouseover').click()
    cy.wait(2000);

    cy.contains('BAL24-1').should('be.visible')


    cy.get("#Item_JHS16").click();
    cy.get("#Item_JHS18").click();
    cy.wait(2000);

    cy.get('#Item_JHS16').click()
        cy.get('#Item_JHS18').click()
        cy.wait(2000)

        cy.get('.ui-button').click().type('BAL24-1'); // Open the dropdown
        cy.get('.ui-menu-item').contains('BAL24-1').click(); // Select 'ANH1'


    cy.wait(2000)
   cy.get('#txtEditLotNumber')
      .should('be.visible')
      .should('not.have.value', '') // ensure it's populated
      .invoke('val')
      .then((pValue) => {
        cy.log('Prorated Head Value:', pValue);
        expect(pValue).to.include('BAL24-1');
      });
    
  });
});
