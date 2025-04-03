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


describe('Add New Predefined Treatments and verify', () => {

    it('NAVIGATION TO System Setup > Health > Predefined Treatments', () => {
        //Predefined Treatments
    cy.get('#Item_COR48').click()
    cy.get('#Item_COR92').click()
    cy.get('#Item_COR101').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Predefined Treatments').should('be.visible')

    })

    it('Add New Medical Item ', () => {
        cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/article/a/span[2]').click()
        cy.get('#txtTreatmentDesc').focus().type('AA' + randomString)
        cy.get('#txtTreatmentShortName').focus().type(randomString)
        cy.get('#txtNotes').focus().type('Test Notes')
        cy.get('#selOwnerTab_0').select('Bloat')


        cy.get('#btnSave').click()
        cy.wait(1000)
        cy.get('#popup_message').should('contain', 'Predefined treatment has been saved successfully')
        cy.wait(1000)
        cy.get('#popup_ok').click()
    })

    it('Verify Medical Item', () => {

        cy.get('#jqgh_preTreatmentsGridView_CreatedOn').click()
        cy.wait(2000)
        cy.get('#jqgh_preTreatmentsGridView_CreatedOn').click()
        cy.wait(2000)

        cy.get('#preTreatmentsGridView')
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