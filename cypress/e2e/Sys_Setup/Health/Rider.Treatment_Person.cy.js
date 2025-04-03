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


describe('Add New Rider/Treatment Person and verify', () => {

    it('NAVIGATION TO System Setup > Health > Rider/Treatment Person', () => {
        //Rider/Treatment Person
    cy.get('#Item_COR48').click()
    cy.get('#Item_COR92').click()
    cy.get('#Item_COR103').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Rider/Treatment Person').should('be.visible')

    })

    it('Add New Rider/Treatment Person ', () => {
        cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/article/a/span[2]').click()
        cy.get('#txtName').focus().type('AA' + randomString)
        cy.get('#txtRiderTreatmentShortName').focus().type(randomString)
        cy.get('#chkRider').check()
        cy.get('#chkTreatmentPerson').check()

        cy.get('#btnSave').click()
        cy.wait(1000)
        cy.get('#popup_message').should('contain', 'Rider/Treatment Person information has been saved successfully')
        cy.wait(1000)
        cy.get('#popup_ok').click()
    })

    it('Verify Rider/Treatment Person', () => {

        cy.get('#jqgh_RiderTreatmentGridView_CREATEDON').click()
        cy.wait(2000)
        cy.get('#jqgh_RiderTreatmentGridView_CREATEDON').click()
        cy.wait(2000)

        cy.get('#RiderTreatmentGridView')
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
                    .should('have.text', 'YES')
                        cy.get('td:nth-child(4)') 
                        .should('have.text', 'YES')
                        
            })
            })
    })
})