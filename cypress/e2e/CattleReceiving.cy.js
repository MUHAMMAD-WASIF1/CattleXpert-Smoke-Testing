import 'cypress-xpath';
import dayjs from 'dayjs';
import example from '../fixtures/example.json'
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});
describe('Cattle Contract - Create and Save', () => {
  it('Should login, navigate to Cattle Receiving, and create a New Cattle Buy', () => {
    
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
    cy.xpath('//*[@id="6"]/td[3]').should('be.visible').click();

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
    cy.xpath('//*[@id="PenAssignment"]').click();
    cy.get('#lnkSamePen > span').click();

    const LotNumber = `Lot${Math.floor(Math.random() * 55)}`;
    cy.get('#txtLotNumber').type(LotNumber);
    cy.get('#btnSaveLotNumber').click();
    cy.get('#popup_ok').click();
    cy.get('.ddlprocessReg').select('Incoming Calf');
    cy.get('select.ddlcust').select('2-6Wts');
    cy.xpath('/html/body/form/section[1]/section[2]/section/section[1]/article/section[3]/div/div/div[3]/div[1]/div/div[3]/div[3]/div/table/tbody/tr[2]/td[16]/input').clear().type('100')
    cy.xpath('/html/body/form/section[1]/section[2]/section/section[1]/article/section[3]/div/div/div[3]/div[1]/div/div[3]/div[3]/div/table/tbody/tr[2]/td[17]/input').clear().type('50000')
    cy.xpath('/html/body/form/section[1]/section[2]/section/section[1]/article/section[3]/div/div/div[3]/div[1]/div/div[3]/div[5]/table/tbody/tr[2]/td[2]/input[1]').click();
    cy.get('#popup_ok').click();
    cy.xpath('/html/body/form/section[1]/section[2]/section/section[1]/article/section[3]/div/div/div[3]/div[1]/div/div[3]/div[5]/table/tbody/tr[2]/td[1]').click();
    cy.get('#btnProcSetup').click();
    cy.get('#chk1').click();
    cy.get('#chk17').click();
    cy.get('#chk18').click();
    cy.get('#chk23').click();
    cy.get('#chk38').click();
    cy.get('#chk38').click();
    cy.xpath('//*[@id="procSetup_popup"]/li[4]/ul/li/fieldset/table/tbody/tr/td[1]/select').select('Rev G (120 Days)')
    cy.get('#txtImplRemarks').type('Automate')
    cy.get('.frt > #btnSave').click();
    cy.get('#popup_ok').click();
    cy.get('#btnProcSetupOK').click();
    cy.get('#lnkProcSummary').click();
    cy.get('#btnDefaultProcessing').click();
    cy.get('#popup_ok').click();
    cy.get('#btnProcessSummaryOK').click();
    cy.get('#btnMove').click();
    cy.get('#popup_ok').click();
    cy.get('#popup_ok').click();
  });
});