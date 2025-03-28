import logindata from '../../fixtures/logindata.json';
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe('Realizer Sale Worksheet', () => {
  beforeEach(() => {
    cy.visit('/Login.aspx');

    // Clear cookies, localStorage, and sessionStorage
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });

    // Reload the page to reset state
    cy.reload();

    cy.get('#txtUserName').type(logindata.name);
    cy.get('#txtPassword').type(logindata.pass);
    cy.get('#btnLogin').click();
    cy.get('#ddlFeedyardList').select('jacksonbeta-JKS3');
    cy.get('#btnConnect').click();

    // Hover over the Sales menu and navigate to Realizer Sale Worksheet
    cy.contains('Sales').trigger('mouseover');
    cy.contains('Show List WorkSheet').click();

    // Ensure user is on Realizer Sale Worksheet page
    // cy.url().should('include', 'Show List Worksheet');
    // cy.contains('Show List Worksheet').should('be.visible');
  });

  it('Verify that entering a fucture market week value displays the projected lots for that week.', () => {

    cy.get('#txtPlus').clear().type('21');
    cy.get('#rdbSaleTypeBoth').click();
    cy.get('#rdbFillStatusTypeBoth').click();
    cy.get('#rbdGrowStageTypeboth').click(); 
    cy.get('#btnRefresh').click();
    cy.wait(2000);
    cy.get('#ShowListGridView').should('be.visible');
    });
    it('Verify that the list sort by the All Lots', () => {

      cy.get('#ddlLot').select('All Lots'); 
      cy.get('#btnRefresh').click();
      cy.wait(2000);
      cy.get('#ShowListGridView').should('be.visible');
      });
  });