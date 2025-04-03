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


describe('Add New Processing Regimen and verify', () => {

    it('NAVIGATION TO System Setup > Health > Processing Regimen', () => {
        //Processing Regimen
    cy.get('#Item_COR48').click()
    cy.get('#Item_COR92').click()
    cy.get('#Item_COR102').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Processing Regimen').should('be.visible')

    })

    it('Add New Processing Regimen ', () => {
        cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/article/a/span[2]').click()
        cy.get('#txtRegimenDescription').focus().type('AA' + randomString)
        cy.get('#txtShortName').focus().type(randomString)
        cy.get('#chk6').check()
        cy.get('#chk20').check()
        cy.get('#chk29').check()
        cy.get('#chk41').check()
        cy.get('#chk51').check()
        cy.get('tr > :nth-child(1) > select').select('Rev G (120 Days) Steer-Male')
        cy.wait(1000)

        cy.get('#btnSave').click()
        cy.wait(1000)
        cy.get('#popup_message').should('contain', 'Processing Regimen has been saved successfully')
        cy.wait(1000)
        cy.get('#popup_ok').click()
    })

    it('Verify Processing Regimen', () => {

        cy.get('#jqgh_processingRegGridView_CreatedOn').click()
        cy.wait(2000)
        cy.get('#jqgh_processingRegGridView_CreatedOn').click()
        cy.wait(2000)

        cy.get('#processingRegGridView')
            .should('be.visible')
            .within(() => {
                cy.get('tr[role="row"]') // Select all rows within the table body
                .eq(1) // Get the *first* row
                .within(() => {
                    cy.get('td:nth-child(1)') 
                    .should('have.text', 'AA' + randomString)
                        cy.get('td:nth-child(2)') 
                        .should('have.text', randomString)
                        
            })
            })
    })
})