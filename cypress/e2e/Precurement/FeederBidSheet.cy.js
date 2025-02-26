import 'cypress-xpath';
import example from '../../fixtures/example.json';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe('Creating Feeder Bit Sheet', () => {
  beforeEach(() => {
    // Visit the login page
    cy.visit('/Login.aspx');

    // Clear cookies, localStorage, and sessionStorage
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });

    // Reload the page to reset state
    cy.reload();

    // Select Public User
    cy.get('#rbLoginType_0').check();

    // Fetch credentials from fixture file
    const { User, Password } = example.CXUser[0];

    // Enter username and password
    cy.get('#txtUserName').type(User);
    cy.get('#txtPassword').type(Password);

    // Click the login button
    cy.get('#btnLogin').click();

    // Select the db from the Feedyard dropdown
    cy.get('#ddlFeedyardList').select('jheadstr-JKS4');

    // Click the connect button
    cy.get('#btnConnect').click();
  });

  it('Should login, navigate to Cattle Receiving, and create a New Cattle Buy', () => {
    // Hover over the Procurement menu and navigate to Cattle Contract
    cy.contains('Procurement').trigger('mouseover');
    cy.contains('Feeder Bid Sheet').click();
    cy.get('#ddlRationTypes').select('Finisher');
    cy.get('#txtRationCost').clear().type('168.00');
    cy.get('#txtMonthValue1').clear().type('35');
    cy.get('#txtMonthValue2').clear().type('3.9');
    cy.get('#txtMonthValue3').clear().type('4.1');
    cy.get('#txtMonthValue4').clear().type('4.5');
    cy.get('#txtMonthValue5').clear().type('4.9');
    cy.get('#txtMonthValue6').clear().type('5.1');
    cy.get('#txtMonthValue7').clear().type('5.5');
    cy.get('#txtMonthValue8').clear().type('5.9');
    cy.get('#txtMonthValue9').clear().type('6.1');
    cy.get('#txtMonthValue10').clear().type('6.5');
    cy.get('#txtMonthValue11').clear().type('6.9');
    cy.get('#txtMonthValue12').clear().type('7.1');

    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake((url) => {
        win.location.href = url; // Redirects to Feeder Bid Sheet Report in the same tab
      });
    });

    cy.get('#btnCreateBidSheet').click(); // Click to open Feeder Bid Sheet Report
    cy.url().should('include', 'FeederBidSheetReport.aspx'); // Verify navigation

    cy.wait(5000)

    // Navigate back to the Feeder Bid Sheet page
    cy.go('back'); // Goes back to previous page (Feeder Bid Sheet)
  });

  it('Verify the feeder bit sheet creation with CMH.', () => {

    cy.contains('Procurement').trigger('mouseover');
    cy.contains('Feeder Bid Sheet').click();

    cy.get('#ddlRationTypes').select('Finisher');
    cy.get('#txtRationCost').clear().type('178.00');
    cy.get(':nth-child(2) > :nth-child(1) > input').click();
    cy.wait(1000);
    cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/section/section[3]/section[2]/div[1]/div[1]/div[3]/div[3]/div/table/tbody/tr[2]/td[2]/input').clear().should('not.be.disabled').type('4.5');
    cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/section/section[3]/section[2]/div[1]/div[1]/div[3]/div[3]/div/table/tbody/tr[3]/td[2]/input').clear().should('not.be.disabled').type('4.9');
    cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/section/section[3]/section[2]/div[1]/div[1]/div[3]/div[3]/div/table/tbody/tr[4]/td[2]/input').clear().should('not.be.disabled').type('5.1');
    cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/section/section[3]/section[2]/div[1]/div[1]/div[3]/div[3]/div/table/tbody/tr[5]/td[2]/input').clear().should('not.be.disabled').type('5.5');
    cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/section/section[3]/section[2]/div[1]/div[1]/div[3]/div[3]/div/table/tbody/tr[6]/td[2]/input').clear().should('not.be.disabled').type('5.9');
    cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/section/section[3]/section[2]/div[1]/div[1]/div[3]/div[3]/div/table/tbody/tr[7]/td[2]/input').clear().should('not.be.disabled').type('6.1');
    cy.window().then((win) => {
        cy.stub(win, 'open').callsFake((url) => {
          win.location.href = url; // Redirects to Feeder Bid Sheet Report in the same tab
        });
      });
  
      cy.get('#btnCreateBidSheet').click(); // Click to open Feeder Bid Sheet Report
      cy.url().should('include', 'FeederBidSheetReport.aspx'); // Verify navigation
      cy.wait(5000)
      // Navigate back to the Feeder Bid Sheet page
      cy.go('back'); // Goes back to previous page (Feeder Bid Sheet)

    // cy.get('#btnCreateBidSheet').click();
  });
});


