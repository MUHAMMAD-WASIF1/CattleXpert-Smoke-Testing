import logindata from '../../../fixtures/logindata.json';
import 'cypress-xpath';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

function getRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe('should be navigate to the Program', () => {
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
    cy.get('#ddlFeedyardList').select(logindata.database);
    cy.get('#btnConnect').click();

    // Hover over the System Setup click on the Procurement and navigate to Program
    cy.get('#Item_COR48').click();
    cy.xpath('/html/body/form/section[1]/nav/ul/li[11]/ul/li[15]/a').click();
    cy.contains('Program').click();
  });

  it('Create a new Program with random values and verify in grid', () => {
    const randomDesc = getRandomString(10);
    const randomCode = getRandomString(5);
    const randomFactor = (Math.random() * 10).toFixed(2);

    cy.get('#lnkNewProgram > [lang="en"]').click();
    cy.get('#lnkNewProgram > [lang="en"]').click();
    cy.get('#txtlotclassification_desc').type(randomDesc);
    cy.get('#txtProgramCode').type(randomCode);
    cy.get('#txtAvggainfactor').type(randomFactor);
    cy.get('#btnSave').click();
    cy.reload();
    cy.get('#ChkShowAllUserProfile').check();

    // Verify the newly created program in the grid
    cy.get('table').contains('td', randomDesc).should('be.visible');
    cy.get('table').contains('td', randomCode).should('be.visible');
    cy.get('table').contains('td', randomFactor).should('be.visible');
  });

  it('Update an existing Program and verify in grid', () => {
    const newRandomCode = getRandomString(5);
    const newRandomFactor = (Math.random() * 10).toFixed(2);

    // Locate the existing program in the grid and click to edit
    cy.get('#JKS3 > [aria-describedby="programGridView_Description"]').click();

    // Update the values
    cy.get('#txtProgramCode').clear().type(newRandomCode);
    cy.get('#txtAvggainfactor').clear().type(newRandomFactor);
    cy.get('#btnSave').click();
    cy.reload();
    cy.get('#ChkShowAllUserProfile').check();

    // Verify the updated values in the grid
    cy.get('table').contains('td', newRandomCode).should('be.visible');
    cy.get('table').contains('td', newRandomFactor).should('be.visible');
  });
});