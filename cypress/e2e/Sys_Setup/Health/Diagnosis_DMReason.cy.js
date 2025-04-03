import { loginSandbox, getRandomNumbers, getRandomString } from '../../../support/function.js';
const randomNumbers = getRandomNumbers(3);
const randomString = getRandomString(4);
import 'cypress-xpath';


describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})


describe('Create New Diagnosis/Dead Medical Reason and Verify', () => {

    it('NAVIGATION TO System Setup > Health > Diagnosis/Dead Medical Reason', () => {
    //Diagnosis/Dead Medical Reason
    cy.get('#Item_COR48').click()
    cy.get('#Item_COR92').click()
    cy.get('#Item_COR94').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Diagnosis/Dead Medical Reason').should('be.visible')
    
    })

    it('Create New Diagnosis/Dead Medical Reason', () => {
        cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/article/a/span[2]').click()
        cy.get('#txtDescription').focus().clear().type('AA'+randomString)
        cy.get('#txtShortName').focus().clear().type(randomString)
        cy.get('#ddlCategory').select('Respiratory')
        cy.get('#chkDiagnosis').check()
        cy.get('#chkDeadMedicalReason').check()

        cy.get('#btnSave').click()
        cy.wait(2000)
        cy.get('#popup_message').should('contain', 'Dead Medical Reason has been inserted successfully')
        cy.wait(2000)
    })

    it('Verify New Diagnosis/Dead Medical Reason', () => {
        cy.get('#deadReasonGridView')
            .should('be.visible')
            .within(() => {
                cy.get('td[aria-describedby="deadReasonGridView_Description"]')
                .contains(randomString).should('be.visible')
                cy.get('td[aria-describedby="deadReasonGridView_ShortName"]')
                .contains(randomString).should('be.visible') 
                cy.get('td[aria-describedby="deadReasonGridView_Category"]')
                .contains('Respiratory').should('be.visible') 


    })
})

})