import { loginSandbox, getRandomNumbers } from '../../support/function.js';
import 'cypress-xpath';
const randomNumbers = getRandomNumbers(4);

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})


describe('Create New Pen and Verify', () => {

    it('NAVIGATION TO System Setup > Location > Physical Pen', () => {
    //Physical Pen
    cy.get('#Item_COR48').click()
    cy.get('#Item_COR118').click()
    cy.get('#Item_COR120').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Physical Pen').should('be.visible')
    
    })

    it('Create New Pen', () => {
        cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/article/a').click()
        cy.get('#txtPenNumber').focus().clear().type(randomNumbers)
        cy.get('#txtDefCapacity').focus().clear().type('100')
        cy.get('#ddlDefaultPenType').select('Receiving')
        cy.get('#ddlPenClass').select('Grow')
        cy.get('#ddlLocation').select('JacksonSandBox')

        cy.get('#btnSave').click()
        cy.get('#popup_message').should('contain', 'Physical Pen Setup has been saved successfully')
        cy.wait(2000)
        cy.get('#popup_ok').click()
    })

})

describe('Navigate to recieving and process newly created pen', () => {
  it('Navigate and process', () => {
    
    
    // Hover over the Procurement menu and navigate to Cattle Contract
    cy.contains('Procurement').trigger('mouseover');
    cy.contains('Cattle Receiving').click();

    // Ensure user is on Cattle Contract page
    cy.url().should('include', 'CattleReceiving');
    cy.get('#lnkNewCattleBuy > span').click();
    cy.get('#ddlCattleContract').select('01');

    
    cy.get('#txtPurchaseDate').type('01/08/2025');
    cy.get('#txtPurchaseHead').should('be.visible').click().clear().type('100')
    cy.get('#txtTotalPayWeight').should('be.visible').click().clear().type('50000')
    cy.get('#txtAvgPayWeight').should('be.visible');
    cy.get('#ddlGender').select('Steer-Male');
    cy.get('#ddlOwner').select('testing');
    cy.get('#ddlLocation').select('JacksonSandBox')
    cy.get('#txtNotes').type('Automation');
   
    cy.get('#btnSave').click();
    cy.get('#popup_container').should('be.visible');
    cy.get('#popup_ok').click();

    cy.get('#ScaleTicket > .magenta > span').click();
    cy.get('#ddlCattleScaleTicketPenNo').select(randomNumbers);
    

    const ScaleTicket = Math.floor(1000 + Math.random() * 9000);
    cy.get('#txtCattleScaleTicketNo').type(ScaleTicket);

   
    cy.get('#txtCattleScaleTicketNoOfHeads').should('be.visible').click().clear().type('100')
    cy.get('#txtCattleScaleTicketTotalOffTruckWght').should('be.visible').click().clear().type('50000')
    
    cy.get('#txtCattleScaleTicketNotes').type('Automate ScaleTicket');
    cy.get('#btnCattleScaleTicketSave').click();
    cy.get('#popup_ok').click();
    
  });
});

describe('Navigate to pen details and verify newly created pen details', () => {

    it('Verify New Pen', () => {
        // Pen Details
    cy.get('#Item_COR16').click()
    cy.get('#Item_COR20').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Pen Details').should('be.visible')

    cy.get('#txtPenNumber')
    .focus()
    .clear()
    .type(randomNumbers)
    .wait(1000)          
    .type('{enter}')
    .blur()
    .wait(3000)          // Wait for data to load
    
    })

    it('Verify New Pen Details', () => {
        cy.get('#txtPenTypeCode').should('have.value', 'Receiving')
        cy.get('#txtPenClassCode').should('have.value', 'Grow')
        cy.get('#txtPenLocation').should('have.value', 'JacksonSandBox')
        cy.get('#txtDefaultCapacity').should('have.value', '100')
        cy.get('#txtInPen').should('have.value', '100')
        cy.get('#txtOutside').should('have.value', '0')
        cy.get('#txtTotalHeads').should('have.value', '100')
        cy.get('#txtLotAvgPayWght').should('have.value', '500')
        cy.get('#txtAvgStartWght').should('have.value', '500')
           
    
    })

})
