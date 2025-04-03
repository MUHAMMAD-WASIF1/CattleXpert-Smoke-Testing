import { loginSandbox, getRandomNumbers, getRandomString } from '../../../support/function.js';
const randomNumbers = getRandomNumbers(2);
const randomString = getRandomString(4);
import 'cypress-xpath';


describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})


describe('Add New Medical Item Container and verify', () => {

    it('NAVIGATION TO System Setup > Health > Medical Item Container', () => {
       //Medical Item Container
    cy.get('#Item_COR48').click()
    cy.get('#Item_COR92').click()
    cy.get('#Item_COR99').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Medical Item Container').should('be.visible')   

    })

    it('ADD NEW MEDICAL ITEM CONTAINER', () => {
        //Add New Medical Item Container
        cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/article/a/span[2]').click()
        cy.get('#txtDesription').focus().type('AA' + randomString)
        cy.get('#txtShortName').focus().type(randomString)
        

        cy.get('#btnSave').click()
        cy.wait(1000)
        cy.get('#popup_message').should('contain', 'Medical Item Container has been saved successfully')
        cy.wait(1000)
        cy.get('#popup_ok').click()
    })

    it('Verify Lung Score', () => {

        cy.get('#jqgh_MedItemContanerGridView_CreatedOn').click()
        cy.wait(2000)
        cy.get('#jqgh_MedItemContanerGridView_CreatedOn').click()
        cy.wait(2000)

        cy.get('#MedItemContanerGridView')
            .should('be.visible')
            .within(() => {
                cy.get('td[aria-describedby="MedItemContanerGridView_Description"]')
                    .contains('AA' + randomString).should('be.visible').click();
                cy.wait(2000)
            })
            cy.get('#txtDesription').should('have.value', 'AA' + randomString)
        cy.get('#txtShortName').should('have.value', randomString)
        

    })


})