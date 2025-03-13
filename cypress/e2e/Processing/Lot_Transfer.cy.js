import { loginSandbox, getRandomNumbers } from '../../support/function.js';

// Generate random Number
const randomNumbers = getRandomNumbers(4);

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})

describe('Lot Transfer', () => {

    it('NAVIGATION TO Processing > Lot Transfer', () => {
    //Lot Transfer
    cy.get('#Item_COR16').click()
    cy.get('#Item_COR141').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Lot Transfer').should('be.visible')
    })

    it('Select From Pen and From LOT to transfer', () => {
        cy.get('#txtFromPen').focus().clear().type('0010{downarrow}{enter}')

    })
    it('Transfer the selected lot into new location', () => {

        cy.wait(2000)
        cy.get('#btnSamePen').click()
        cy.get('#NewLotNumberPopup').should('be.visible')
        cy.get('#chkCreateNewLot').check()
        cy.get('#txtDdlNewLot').focus().clear().type(randomNumbers)
        
        


        // cy.get('#btnTransfer').click()
        // cy.get('#popup_message > .SucessMsg').should('contain', 'Lot has been transferred successfully')
        // cy.get('#popup_ok').click()
    })

})