const { describe } = require("mocha");
import "cypress-xpath";

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
    // Clear cookies, localStorage, and sessionStorage
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    // Reload the page to reset state
    cy.reload();
  });

  it("Report > List > Vendor List", () => {
    cy.Login();
    cy.dbsetup();
    cy.wait(3000);
    // Hover over "Reports"
    cy.get("#Item_JHS44 > .level0parent").trigger("mouseover").click();

    cy.get("#Item_JHS166").trigger("mouseover");
    cy.get("#Item_JHS174").trigger("mouseover").click();
    cy.wait(6000);

    cy.contains("Anprolium").should("be.visible");
    cy.wait(2000);

    cy.get("#Item_JHS48").trigger("mouseover");
    cy.get("#Item_JHS110").trigger("mouseover");
    cy.get("#Item_JHS115").trigger("mouseover").click();
    cy.wait(6000);

    cy.get('#JHS8 > [aria-describedby="SpecialServiceGridView_SPCL_SVC_DESC"]').click()
  
    cy.wait(3000)
    cy.get('#txtDescription')
      .should("be.visible")
      .should("not.have.value", "") // ensure it's populated
      .invoke("val")
      .then((SSNAME)=>{
        cy.log("Special Service Name :" , SSNAME)
        expect(SSNAME).to.include('Anprolium');
      });
  });
});
