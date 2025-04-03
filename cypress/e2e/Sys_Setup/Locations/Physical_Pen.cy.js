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
