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


describe('Add New Lung Score and verify', () => {

    it('NAVIGATION TO System Setup > Health > Lung Score', () => {
        //Lung Score
        cy.get('#Item_COR48').click()
        cy.get('#Item_COR92').click()
        cy.get('#Item_COR97').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Lung Score').should('be.visible')

    })

    it('Add New Lung Score', () => {
        cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/article/a/span[2]').click()
        cy.get('#txtDescription').focus().type('AA' + randomString)
        cy.get('#txtShortName').focus().type(randomString)
        cy.get('#txtLungScoreValue').focus().type(randomNumbers)

        cy.get('#btnSave').click()
        cy.wait(1000)
        cy.get('#popup_message').should('contain', 'Lung Score has been saved successfully')
        cy.wait(1000)
        cy.get('#popup_ok').click()
    })

    it('Verify Lung Score', () => {

        cy.get('#jqgh_productGridView_CREATEDON').click()
        cy.wait(2000)
        cy.get('#jqgh_productGridView_CREATEDON').click()
        cy.wait(2000)

        cy.get('#productGridView')
            .should('be.visible')
            .within(() => {
                cy.get('td[aria-describedby="productGridView_DESCRIPTION"]')
                    .contains('AA' + randomString).should('be.visible').click();
                cy.wait(2000)
            })
        cy.get('#txtDescription').should('have.value', 'AA' + randomString)
        cy.get('#txtShortName').should('have.value', randomString)
        cy.get('#txtLungScoreValue').should('have.value', randomNumbers)

    })

    it('Delete New Lung Score', () => {

        cy.get('#btnDelete').click()
        cy.wait(1000)
        cy.get('#popup_message').should('contain', 'Are you sure want to delete')
        cy.wait(1000)
        cy.get('#popup_ok').click()
        cy.wait(1000)
        cy.get('#popup_message').should('contain', 'Lung Score has been deleted successfully')
        cy.wait(1000)
        cy.get('#popup_ok').click()
    })
})