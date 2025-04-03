import { loginSandbox,  getRandomString } from '../../../support/function.js';
const randomString = getRandomString(4);
import 'cypress-xpath';


describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})


describe('Add Medical Item Charge Categories', () => {

    it('NAVIGATION TO System Setup > Health > Medical Item Charge Categories', () => {
     //Medical Item Charge Categories
    cy.get('#Item_COR48').click()
    cy.get('#Item_COR92').click()
    cy.get('#Item_COR98').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Medical Item Charge Categories').should('be.visible')
    
    })

    it('Add New Medical Item Charge Categories', () => {
        cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/article/a/span[2]').click()
        cy.get('#txtDescription').focus().type('AA' + randomString)
        cy.get('#txtShortName').focus().type(randomString)
        cy.get('#ddlChargeType').select('Feed')

        cy.get('#btnSave').click()
        cy.wait(1000)
        cy.get('#popup_message').should('contain', 'Medical Item Category has been saved successfully')
        cy.wait(1000)
        cy.get('#popup_ok').click()
    })

    it('Verify Medical Item Charge Categories', () => {

        cy.get('#jqgh_productGridView_CreatedOn').click()
        cy.wait(2000)
        cy.get('#jqgh_productGridView_CreatedOn').click()
        cy.wait(2000)

        cy.get('#productGridView')
            .should('be.visible')
            .within(() => {
                cy.get('tr[role="row"]') // Select all rows within the table body
                .eq(1) // Get the *first* row
                .within(() => {
                    cy.get('td:nth-child(1)') 
                    .should('have.text', 'AA' + randomString)
                        cy.get('td:nth-child(2)') 
                        .should('have.text', randomString)
                        cy.get('td:nth-child(3)') 
                        .should('have.text', 'Feed')
            })
            })
    })

})