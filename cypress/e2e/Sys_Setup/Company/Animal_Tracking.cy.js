import { loginSandbox } from '../../../support/function.js';


describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})


describe('Toggle Animal Tracking and Verify', () => {

    it('NAVIGATION TO System Setup > Company > Animal Tracking', () => {
    //Animal Tracking
    cy.get('#Item_COR48').click()
    cy.get('#Item_COR59').click()
    cy.get('#Item_COR61').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Animal Tracking').should('be.visible')
    
    })

    it('Toggle Animal Tracking', () => {
         //Turn off Animal Tracking
        cy.get('.slider').click()
        cy.get('#btnSave').click()
        cy.get('#popup_message').should('contain', 'Animal Tracking has been updated successfully')
        cy.wait(2000)
        cy.get('#popup_ok').click()
        //Turn on Animal Tracking
        cy.get('.slider').click()
        cy.get('#btnSave').click()
        cy.get('#popup_message').should('contain', 'Animal Tracking has been updated successfully')
        cy.wait(2000)
        cy.get('#popup_ok').click()

        
    })
})
