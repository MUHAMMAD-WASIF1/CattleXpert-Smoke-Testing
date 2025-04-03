import logindata from '../../../fixtures/logindata.json';
import dayjs from "dayjs";
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomTwoDigitValue() {
  return Math.floor(Math.random() * 90) + 10; // Generates a random number between 10 and 99
}

describe('should navigate to Cattle Base Weight successfully', () => {
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
    cy.get('#Item_COR49').click();
    cy.get('#Item_COR57').click();
  });

  it('Create a Projection Default', () => {
    cy.get('#lnkProjectionDefault > [lang="en"]').click();
    cy.wait(1000); // Wait for the page to load

    // Select a random option from the Description dropdown
    cy.get('#ddlelement').then($select => {
      const options = $select.find('option');
      const randomOption = getRandomElement(options.toArray());
      cy.wrap($select).select(randomOption.value);
    });

    // Enter a random 2-digit value
    cy.get('#txtValue').type(getRandomTwoDigitValue().toString());

    // Select a random option from the Gender dropdown
    cy.get('#ddlGender').then($select => {
      const options = $select.find('option');
      const randomOption = getRandomElement(options.toArray());
      cy.wrap($select).select(randomOption.value);
    });

    // Enter weight values
    cy.get('#txtWeightMin').type('400');
    cy.get('#txtWeightMax').type('700');
    cy.get('#chkMiscelaneous').click();

    // Select a random month from the Start Month dropdown
    cy.get('#txtStartMonth').then($select => {
      const options = $select.find('option');
      const randomOption = getRandomElement(options.toArray());
      cy.wrap($select).select(randomOption.value);
    });

    // Select a random month from the End Month dropdown
    cy.get('#txtEndMonth').then($select => {
      const options = $select.find('option');
      const randomOption = getRandomElement(options.toArray());
      cy.wrap($select).select(randomOption.value);
    });
    const currentDate = dayjs().subtract(1, "month").format("MM/DD/YYYY hh:mm:ss A");
    cy.get('#txtInEffective')
      .invoke("val", currentDate)
      .trigger("input")
      .trigger("change");

      cy.get('#btnSave').click();
  });
  it('Update a random Breed ADG Factor', () => {
    // Ensure the grid is visible
    cy.get('#gview_productGridView').should('be.visible');

    // Select a random breed from the grid using XPath
    cy.xpath('//tr[contains(@id, "JKS")]').should('have.length.greaterThan', 0).then($rows => {
      const randomRow = getRandomElement($rows.toArray());
      cy.wrap(randomRow).click();

      // Enter a new random ADG factor
      const newADGFactor = getRandomADGFactor();
      cy.get('#ddlAdgFactor').clear().type(newADGFactor.toString());

      cy.get('#btnSave').click();
    });
  });
});