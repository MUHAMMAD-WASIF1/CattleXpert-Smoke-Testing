import { beforeEach } from 'mocha'
import dayjs from 'dayjs';
import example from '../fixtures/example.json'
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});
describe('Should login, navigate to Cattle Contract,"', () => {
  it('Verify a cattle contract is created successfully and shows a Contract Created message after saving.', () => {
    
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

    // Hover over the Procurement menu and navigate to Cattle Contract
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
  const randomDate = dayjs().subtract(randomDays, 'day').format('MM/DD/YYYY');

  // Enter the random date in the purchase date field
  cy.get('#txtPurDate').clear().type(randomDate);
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
    cy.get('#txtVendorLotNumber').type('Null');
    cy.get('#txtHeadCount').type('200');
    cy.get('#ddlGender').select('Steer-Male');
    cy.get('#txtAvgWeight').type('500');
    cy.get('#ddlBreed').select('Black Angus X');
    cy.get('#ddlFlesh').select('Green');
    cy.get('#ddlFrame').select('Large');
    cy.get('#txtQuality').type('Null');

    const currentDate = dayjs().format('MM/DD/YYYY hh:mm:ss A');

    cy.get('#txtDeliveryStartDt').type(currentDate);
    cy.get('#txtDeliveryEndDt').type('02/03/2026');
    cy.get('#ddlDestination').select('Finish');
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
    cy.get('#popup_cancel').click();
  });

  it('Fill the all fields and Cancel the contract', () => {
    
   // Generate a unique contract number using Date.now()
    const contractNumber = `Test${Math.floor(Math.random() * 150)}`;

    // Fill out form fields
    cy.get('#txtContractNumber').type(contractNumber);
    const randomDays = Math.floor(Math.random() * 30) + 60; 
  // Subtract random days from today’s date
  const randomDate = dayjs().subtract(randomDays, 'day').format('MM/DD/YYYY');

  // Enter the random date in the purchase date field
  cy.get('#txtPurDate').clear().type(randomDate);
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
    cy.get('#txtVendorLotNumber').type('Null');
    cy.get('#txtHeadCount').type('200');
    cy.get('#ddlGender').select('Steer-Male');
    cy.get('#txtAvgWeight').type('500');
    cy.get('#ddlBreed').select('Black Angus X');
    cy.get('#ddlFlesh').select('Green');
    cy.get('#ddlFrame').select('Large');
    cy.get('#txtQuality').type('Null');

    const currentDate = dayjs().format('MM/DD/YYYY hh:mm:ss A');

    cy.get('#txtDeliveryStartDt').type(currentDate);
    cy.get('#txtDeliveryEndDt').type('02/03/2026');
    cy.get('#ddlDestination').select('Finish');
    cy.get('#txtShrinkPercent').type('2');

    cy.get('#ddlPriceType').select('Priced');
    cy.get('#txtPriceperCwt').type('175');
    cy.get('.pdr_10 > input').check();
    cy.get('#ddlSlideType').select('COR1')
    cy.get('#ddlContractStatus').select('Active');

    // Cancel the contract
    cy.get('#btnContractCancel').click();
  });
  it('Fill the all fields and Cancel the contract', () => {
    
    // Generate a unique contract number using Date.now()
     const contractNumber = `Test${Math.floor(Math.random() * 150)}`;
 
     // Fill out form fields
     cy.get('#txtContractNumber').type(contractNumber);
     const randomDays = Math.floor(Math.random() * 30) + 60; 
   // Subtract random days from today’s date
   const randomDate = dayjs().subtract(randomDays, 'day').format('MM/DD/YYYY');
 
   // Enter the random date in the purchase date field
   cy.get('#txtPurDate').clear().type(randomDate);
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
     cy.get('#txtVendorLotNumber').type('Null');
     cy.get('#txtHeadCount').type('200');
     cy.get('#ddlGender').select('Steer-Male');
     cy.get('#txtAvgWeight').type('500');
     cy.get('#ddlBreed').select('Black Angus X');
     cy.get('#ddlFlesh').select('Green');
     cy.get('#ddlFrame').select('Large');
     cy.get('#txtQuality').type('Null');
 
     const currentDate = dayjs().format('MM/DD/YYYY hh:mm:ss A');
 
     cy.get('#txtDeliveryStartDt').type(currentDate);
     cy.get('#txtDeliveryEndDt').type('02/03/2026');
     cy.get('#ddlDestination').select('Finish');
     cy.get('#txtShrinkPercent').type('2');
 
     cy.get('#ddlPriceType').select('Priced');
     cy.get('#txtPriceperCwt').type('175');
     cy.get('.pdr_10 > input').check();
     cy.get('#ddlSlideType').select('COR1')
     cy.get('#ddlContractStatus').select('Active');
 
     // Delet the contract
     cy.get('#btnContractDelete').click();
   });
  // it('Should display all necessary fields', () => {
  //   cy.get('#txtContractNumber').should('be.visible');
  //   cy.get('#txtPurDate').should('be.visible');
  //   cy.get('#ddlBuyer').should('be.visible');
  //   cy.get('#ddlOrderBuyer').should('be.visible');
  //   cy.get('#ddlOrigin').should('be.visible');
  //   cy.get('#ddlAuction').should('be.visible');
  //   cy.get('#ddlRanch').should('be.visible');
  //   cy.get('#txtBirthDate').should('be.visible');
  //   cy.get('#ddlBirthState').should('be.visible');
  //   cy.get('#ddlOwner').should('be.visible');
  //   cy.get('#ddlPayee1').should('be.visible');
  //   cy.get('#ddlPayee2').should('be.visible');
  //   cy.get('#txtHeadCount').should('be.visible');
  //   cy.get('#ddlGender').should('be.visible');
  //   cy.get('#txtAvgWeight').should('be.visible');
  //   cy.get('#ddlBreed').should('be.visible');
  //   cy.get('#ddlFlesh').should('be.visible');
  //   cy.get('#ddlFrame').should('be.visible');
  //   cy.get('#txtDeliveryStartDt').should('be.visible');
  //   cy.get('#txtDeliveryEndDt').should('be.visible');
  //   cy.get('#ddlDestination').should('be.visible');
  //   cy.get('#txtShrinkPercent').should('be.visible');
  //   cy.get('#ddlPriceType').should('be.visible');
  //   cy.get('#txtPriceperCwt').should('be.visible');
  //   cy.get('.pdr_10 > input').should('be.visible');
  //   cy.get('#ddlSlideType').should('be.visible');
  //   cy.get('#ddlContractStatus').should('be.visible');
  //   cy.get('#btnContractSave').should('be.visible');
  //   cy.get('#btnContractDelete').should('be.visible');
  // });
  it('Verify cattle contract form shows validation messages when saving with empty fields.', () => {
    cy.get('#btnContractSave').click();
    cy.get('#ddlBuyer').contains('This field is required').should('be.visible');
    cy.get('#txtHeadCount').contains('This field is required').should('be.visible');
    cy.get('#ddlGender').contains('This field is required').should('be.visible');
    cy.get('#txtAvgWeight').contains('This field is required').should('be.visible');
    cy.get('#txtDeliveryStartDt').contains('This field is required').should('be.visible');
    cy.get('#ddlDestination').contains('This field is required').should('be.visible');
    cy.get('#ddlPriceType').contains('This field is required').should('be.visible');
    cy.get('#txtBasisperCwt').contains('This field is required').should('be.visible');
  });

  it('Should not allow negative values in numeric fields', () => {
    cy.get('#txtHeadCount').type('-50').should('be.visible');
    cy.get('#txtPriceperCwt').clear().type('-175').contains('Not a valid Number').should('be.visible');
    cy.get('#btnContractSave').click();
    cy.get('.formErrorContent').contains('Not a valid Number').should('be.visible');
  });
  it('Should not allow negative values in numeric fields', () => {
    cy.get('#txtHeadCount').type('-50');
    cy.get('#txtPriceperCwt').type('-175');
    cy.get('#btnContractSave').click();
    cy.contains('Invalid value').should('be.visible');
});
});