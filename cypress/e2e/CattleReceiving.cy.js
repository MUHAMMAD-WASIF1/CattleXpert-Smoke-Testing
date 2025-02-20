import 'cypress-xpath';
import dayjs from 'dayjs';
import example from '../fixtures/example.json'
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});
describe('Cattle Contract - Create and Save', () => {
  it('Should login, navigate to Cattle Receiving, and create a Ner Cattle Buy', () => {
    
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
    cy.contains('Cattle Receiving').click();

    // Ensure user is on Cattle Contract page
    cy.url().should('include', 'CattleReceiving');
    cy.get('#lnkNewCattleBuy > span').click();
    cy.get('#ddlCattleContract').select('01');

    const currentDate = dayjs().format('MM/DD/YYYY hh:mm:ss A');
    cy.get('#txtPurchaseDate').type(currentDate);
    cy.get('#txtPurchaseDate').type('01/08/2025');
    cy.get('#txtPurchaseHead').should('be.visible').click().clear().type('100')
    cy.get('#txtTotalPayWeight').should('be.visible').click().clear().type('50000')
    cy.get('#txtAvgPayWeight').should('be.visible');
    cy.get('#ddlGender').select('Steer-Male');
    cy.get('#ddlOwner').select('testing');
    cy.get('#txtNotes').type('Automation');
    cy.get('#divCattleCharacteristics > .pd_5 > .icon').click();
    cy.get('#ddlBuyer').select('JKS2');
    cy.get('#ddlOrigin').select('JKS16');
    cy.get('#ddlRanch').select('JKS11');
    cy.get('#ddlAuction').select('JKS12');
    cy.get('#ddlBreed').select('JKS8');
    cy.get('#ddlFlesh').select('JKS3');
    cy.get('#ddlPriorFeed').select('JKS4');
    cy.get('#ddlRiskFactor').select('JKS3');
    cy.get('#txtVenderLotNumber').should('be.visible').click().clear().type('null');
    cy.get('#txtGroup').type('null');
    cy.get('#ddlBirthState').select('COR1');
    cy.get('#txtOldestBirthState').type('01/08/2025');
    cy.get('#btnSave').click();
    cy.get('#popup_container').should('be.visible');
    cy.get('#popup_ok').click();

    cy.get('#ScaleTicket > .magenta > span').click();
    cy.get('#lnkLotPenLookupScaleTicket').click();
    cy.get('#rbActive').click();
    cy.wait(5000)
    cy.xpath('//*[@id="5"]/td[3]').should('be.visible').click();

    const ScaleTicket = Math.floor(1000 + Math.random() * 9000);
    cy.get('#txtCattleScaleTicketNo').type(ScaleTicket);

    const currentDate1 = dayjs().format('MM/DD/YYYY hh:mm:ss A'); // Format should match the input field
    // Clear the date field and type the current date
    cy.get('#txtCattleScaleTicketDate').type(currentDate1);
    cy.get('#txtCattleScaleTicketNoOfHeads').should('be.visible').click().clear().type('100')
    cy.get('#txtCattleScaleTicketTotalOffTruckWght').should('be.visible').click().clear().type('50000')
    cy.get('#ddlCattleScaleTicketCarrier').select('M&R');
    cy.get('#txtCattleScaleTicketTruckNo').type('Null');
    cy.get('#txtCattleScaleTicketNotes').type('Automate ScaleTicket');
    cy.get('#btnCattleScaleTicketSave').click();
    cy.get('#popup_ok').click();
    cy.get('#popup_ok').click();

  });
  
});