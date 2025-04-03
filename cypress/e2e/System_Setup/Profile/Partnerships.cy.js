import logindata from '../../../fixtures/logindata.json';
import 'cypress-xpath';
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe('should navigate to Partnerships profile successfully', () => {
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

    cy.get('#Item_COR48').click();
    cy.get('#Item_COR125').click();
    cy.get('#Item_COR292').click();
  });
// , 'JK31', 'JK32'
  const partnershipNames = ['Alpha Partnership', 'Beta Partnership', 'Gamma Partnership', 'Delta Partnership'];
  const shortNames = ['Alpha', 'Beta', 'Gamma', 'Delta'];
  const interestClasses = ['AmBrandlnspect', 'AmProcessCharge'];
  const AssignYardageRate = `5${Math.floor(Math.random() * .12)}`;
  const owners = ['Bumgarner Ag Services', 'F5 Cattle Company', 'Ferraro Partnership', 'Head to Hoof LLC'];
  const percentages = [[50, 50], [40, 60], [60, 40], [30, 70]];

  it('Create a Partnerships profile', () => {
    cy.get('#lnkNewPartnership > [lang="en"]').click();

    const randomName = Cypress._.sample(partnershipNames);
    const randomShortName = Cypress._.sample(shortNames);
    const randomInterestClass = Cypress._.sample(interestClasses);
    const randomOwners = Cypress._.sampleSize(owners, 2);
    const randomPercentages = Cypress._.sample(percentages);

    cy.get('#txtPartnershipsName').type(randomName);
    cy.get('#txtShortName').type(randomShortName);
    cy.wait(3000);
    cy.get('#txtAssignYardageRate').clear().type(AssignYardageRate);
    cy.get('#ddlAssignInterestClass').select(randomInterestClass);

    // Interact with the custom combobox widget for the first owner
    cy.get('#txtOwnerTab_0').click().type(randomOwners[0]);
    cy.get('.ui-menu-item').contains(randomOwners[0]).click();
    cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/section/div/ul/li[3]/ul/li/table/tbody/tr/td[2]/input').clear().type(randomPercentages[0]);

    // Add a new owner
    cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/section/div/ul/li[3]/ul/li/table/tbody/tr/td[3]/span').click();

    // Interact with the custom combobox widget for the second owner
    cy.get(':nth-child(2) > :nth-child(1) > .custom-combobox > .ui-button').click();
    cy.get('.ui-menu-item').contains(randomOwners[1]).click();
    cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/section/div/ul/li[3]/ul/li/table/tbody/tr[2]/td[2]/input').clear().type(randomPercentages[1]);

    cy.get('#btnSave').click();
  });
});