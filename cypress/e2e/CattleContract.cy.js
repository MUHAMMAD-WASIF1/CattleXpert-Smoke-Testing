import example from '../fixtures/example.json'
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined')) {
    return false
  }
})
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('jquery_lang_js is not defined')) {
      return false
    }
})
describe('Cattle Contract - Create and Save', () => {
  beforeEach('Should login, navigate to Cattle Contract, and create a new contract', () => {
    
    // Visit the login page
    cy.visit('/Login.aspx');

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
    cy.get('#ddlFeedyardList').select('jacksonbeta-JKS3');

    // Click the connect button
    cy.get('#btnConnect').click();

    // Hover over the Procurement menu and navigate to Cattle Contract
    cy.contains('Procurement').trigger('mouseover');
    cy.contains('Cattle Contract').click();

    // Ensure user is on Cattle Contract page
    cy.url().should('include', 'CattleContract');

    // Fill out form fields
    cy.get('#txtContractNumber').type('Testerone');
    cy.get('#txtPurDate').type('01/08/2025');
    cy.get('#ddlBuyer').select('Kats Land & Cattle');
    cy.get('#ddlOrderBuyer').select('Kats Land & Cattle');
    cy.get('#ddlOrigin').select('Nebraska Ranch');
    cy.get('#ddlAuction').select('Iowa Sale Barn');
    cy.get('#ddlRanch').select('Oklahoma Ranch');
    cy.get('#txtBirthDate').type('02/10/2025');
    cy.get('#ddlBirthState').select('Chihuahua');
    cy.get('#ddlOwner').select('Philip Ferraro Inc.');
    cy.get('#ddlPayee1').select('TW Cattle Co LLC');
    cy.get('#ddlPayee2').select('John Walker');

    cy.get('#ddlPriorFeed').select('Improved Pasture');
    cy.get('#ddlProgram').select('Prime Pursuit');
    cy.get('#txtHeadCount').type('200');
    cy.get('#ddlGender').select('Steer-Male');
    cy.get('#txtAvgWeight').type('600');
    cy.get('#ddlBreed').select('Black Angus X');
    cy.get('#ddlFlesh').select('Green');
    cy.get('#ddlFrame').select('Large');

    cy.get('#txtDeliveryStartDt').type('01/08/2025');
    cy.get('#txtDeliveryEndDt').type('02/03/2026');
    cy.get('#ddlDestination').select('Finish');
    // cy.get('#ddlLocation').select('Jackson Beta');
    cy.get('#txtShrinkPercent').type('2');

    cy.get('#ddlPriceType').select('Priced');
    cy.get('#txtPriceperCwt').type('175');
    cy.get('.pdr_10 > input').check();
    cy.get('#ddlSlideType').select('COR1')
    cy.get('#ddlContractStatus').select('Active');

    // Save the contract
    cy.get('#btnContractSave').click();

    // Verify success message
    // cy.contains('Cattle Contract has been updated successfully.').should('be.visible');

    // Click OK on success alert
    cy.get('#popup_ok').click();

    // Handle "Buyer's Projection" popup
    // cy.contains("Would you like to associate a buyer's projection?").should('be.visible');
    // cy.get('#popup_cancel').click();
  });
  it('Should display all necessary fields', () => {
    cy.get('#txtContractNumber').should('be.visible');
    cy.get('#txtPurDate').should('be.visible');
    cy.get('#ddlBuyer').should('be.visible');
    cy.get('#ddlOrderBuyer').should('be.visible');
    cy.get('#ddlOrigin').should('be.visible');
    cy.get('#ddlAuction').should('be.visible');
    cy.get('#ddlRanch').should('be.visible');
    cy.get('#txtBirthDate').should('be.visible');
    cy.get('#ddlBirthState').should('be.visible');
    cy.get('#ddlOwner').should('be.visible');
    cy.get('#ddlPayee1').should('be.visible');
    cy.get('#ddlPayee2').should('be.visible');
    cy.get('#txtHeadCount').should('be.visible');
    cy.get('#ddlGender').should('be.visible');
    cy.get('#txtAvgWeight').should('be.visible');
    cy.get('#ddlBreed').should('be.visible');
    cy.get('#ddlFlesh').should('be.visible');
    cy.get('#ddlFrame').should('be.visible');
    cy.get('#txtDeliveryStartDt').should('be.visible');
    cy.get('#txtDeliveryEndDt').should('be.visible');
    cy.get('#ddlDestination').should('be.visible');
    cy.get('#txtShrinkPercent').should('be.visible');
    cy.get('#ddlPriceType').should('be.visible');
    cy.get('#txtPriceperCwt').should('be.visible');
    cy.get('.pdr_10 > input').should('be.visible');
    cy.get('#ddlSlideType').should('be.visible');

    cy.get('#ddlContractStatus').should('be.visible');
    cy.get('#btnContractSave').should('be.visible');
    cy.get('#btnContractDelete').should('be.visible');
    // test
  });
});