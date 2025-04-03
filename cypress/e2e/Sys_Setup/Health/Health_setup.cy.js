import { loginSandbox, getRandomNumbers } from '../../../support/function.js';
const randomNumbers = getRandomNumbers(2);


describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})


describe('Update Health Setup', () => {

    it('NAVIGATION TO System Setup > Health > Health Setup', () => {
        //Health Setup
        cy.get('#Item_COR48').click()
        cy.get('#Item_COR92').click()
        cy.get('#Item_COR95').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Health Setup').should('be.visible')

    })

    it('Fill details for Health Setup', () => {
        cy.get('#txtRepulDays').focus().clear().type(randomNumbers)
        cy.get('#txtRetreatDays').focus().clear().type(randomNumbers)
        cy.get('#ddlDiagnosis').select('Foot Rot')
        cy.get('#ddlSeverity').select('Low')
        cy.get('#ddlTreatment').select('Abscess')
        cy.get('#ddlProcessWith').select('Butcher')
        cy.get('#ddlTreatWith').select('Bloat')
        cy.get('#ddlTreatPerson').select('Sruthi')
        cy.get('#ddlRider').select('Sruthi')
    })
    it('Update Health Setup', () => {
        cy.get('#btnSave').click()
        cy.wait(2000)
        cy.get('#popup_message').should('contain', 'Health Info has been updated successfully')
        cy.wait(2000)
        cy.get('#popup_ok').click()

    })

    it('VErify updated Health Setup', () => {

        cy.get('#txtRepulDays').should('have.value', randomNumbers)
        cy.get('#txtRetreatDays').should('have.value', randomNumbers)

    })
})