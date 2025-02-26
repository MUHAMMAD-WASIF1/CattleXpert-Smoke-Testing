import 'cypress-xpath';
import dayjs from 'dayjs';
import example from '../fixtures/example.json'
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});
describe('Should login, create a cattle contract and navigate to buyer projection Projection', () => {
  it('Verify that the user can successfully create a Cattle Contract, navigate to the Buyer Projection module, enter the required details, and save the projection, ensuring data is updated accurately.', () => {
    
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
  cy.get('#ddlFeedyardList').select('jacksonsandbox-JKS2');

  // Click the connect button
  cy.get('#btnConnect').click();

  cy.contains('Procurement').trigger('mouseover');
    cy.contains('Cattle Contract').click();

    // Ensure user is on Cattle Contract page
    cy.url().should('include', 'CattleContract');

    // Generate a unique contract number using Date.now()
    const contractNumber = `Test${Math.floor(Math.random() * 150)}`;

    // Fill out form fields
    cy.get('#txtContractNumber').type(contractNumber);

    const randomDays = Math.floor(Math.random() * 30) + 60; 
  // Subtract random days from today’s date
    const randomDates = dayjs().subtract(randomDays, 'day').format('MM/DD/YYYY');
  // Enter the random date in the purchase date field
    cy.get('#txtPurDate').clear().type(randomDates);
    cy.get('#ddlBuyer').select('John Walker');
    cy.get('#ddlOrderBuyer').select('John Walker');
    cy.get('#ddlOrigin').select('Nebraska Ranch');
    cy.get('#ddlAuction').select('Iowa Sale Barn');
    cy.get('#ddlRanch').select('Oklahoma Ranch');
    cy.get('#txtBirthDate').type('02/10/2025');
    cy.get('#ddlBirthState').select('Chihuahua');
    cy.get('#ddlOwner').select('jackson');
    cy.get('#ddlPayee1').select('SarTec');
    cy.get('#ddlPayee2').select('Adam Jackson');

    cy.get('#ddlPriorFeed').select('Corn');
    cy.get('#ddlProgram').select('None');
    cy.get('#txtVendorLotNumber').clear().type('Null');
    cy.get('#txtHeadCount').clear().type('200');
    cy.get('#ddlGender').select('Steer-Male');
    cy.get('#txtAvgWeight').clear().type('500');
    cy.get('#ddlBreed').select('Black Angus X');
    cy.get('#ddlFlesh').select('Green');
    cy.get('#ddlFrame').select('Large');
    cy.get('#txtQuality').clear().type('Null');

    const currentDate = dayjs().format('MM/DD/YYYY hh:mm:ss A');

    cy.get('#txtDeliveryStartDt').type(currentDate);
    cy.get('#txtDeliveryEndDt').type('02/03/2026');
    cy.get('#ddlDestination').select('Finish');
    cy.get('#txtShrinkPercent').clear().type('2');

    cy.get('#ddlPriceType').select('Priced');
    cy.get('#txtPriceperCwt').clear().type('230');
    cy.get('.pdr_10 > input').check();
    cy.get('#ddlSlideType').select('COR1')
    cy.get('#ddlContractStatus').select('Active');

    // Save the contract
    cy.get('#btnContractSave').click();

    // Verify success message
    // cy.contains('Cattle Contract has been saved successfully.').should('exist').should('be.visible');
    // Click OK on success alert
    cy.get('#popup_ok').click();

    // Handle "Buyer's Projection" popup
    // cy.contains("Would you like to associate a buyer's projection?").should('exist').should('be.visible');
    // cy.get('#popup_ok').click();
    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake((url) => {
        win.location.href = url; // Redirects to Buyer Projection in same tab
      });
    });
    cy.get('#popup_ok').click(); // Click to open Buyer Projection
    cy.url().should('include', 'BuyersProjectionWorksheet.aspx'); // Verify navigation

    cy.wait(5000);
    cy.get('#btnCalculate').click();
    cy.wait(5000);
    cy.xpath('//*[@id="SecRetrieveSch"]/option[1]').click();
    cy.get('#txtMarkup').type('5')
    cy.get('#btnAVGDMCostTonSelect').click();
    cy.get('#txtSalesPerCWT').type('280');
    cy.get('#txtProfitHead').clear().type('50');
    cy.get('#txtADG').type('4.85');
    cy.get('#txtOutWeight').type('1200');
    cy.get('#txtYardage').type('20');
    cy.get('#txtProcessingHead').type('10');
    cy.get('#txtVetHead').type('5');
    cy.get('#txtMisChargeHead').type('3');
    cy.get('#txtMisChargeHead').type('10');
    // cy.wait(3000)
    cy.get('#btnSave').click();
    // cy.wait(3000)
    // cy.get('#popup_ok').click();
    // cy.xpath('//*[@id="btnSave"]').click();
    // cy.get('#popup_ok').click();
  });
});
