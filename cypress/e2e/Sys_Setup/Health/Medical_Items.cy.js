import { loginSandbox, getRandomNumbers, getRandomString } from '../../../support/function.js';
const randomNumbers = getRandomNumbers(1);
const randomString = getRandomString(4);
import 'cypress-xpath';


describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})


describe('Add New Medical Items and verify', () => {

    it('NAVIGATION TO System Setup > Health > Medical Items', () => {
         //Medical Items
    cy.get('#Item_COR48').click()
    cy.get('#Item_COR92').click()
    cy.get('#Item_COR100').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Medical Items').should('be.visible')

    })

    
    it('Add New Medical Item ', () => {
        cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/article/a/span[2]').click()
        cy.get('#txtMedicalItemDescription').focus().type('AA' + randomString)
        cy.get('#txtShortName').focus().type(randomString)
        cy.get('#ddlCategory').select('Other')
        cy.get('#txtQuantity').focus().type(randomNumbers)
        cy.get('#rbPerHead').click()
        cy.get('#ddlUOM').select('Each')
        cy.get('#ddlDosageRounding').select('None')
        cy.get('#txtNotes').focus().type('Test Notes')
        cy.get('#txtWithdrawalDays').focus().type('1' + randomNumbers)


        cy.get('#btnMedicalItemSave').click()
        cy.wait(1000)
        cy.get('#popup_message').should('contain', 'Medical Item has been saved successfully')
        cy.wait(1000)
        cy.get('#popup_ok').click()
    })

    it('Verify Medical Item', () => {

        cy.get('#jqgh_MedicalItemGridView_CreatedDate').click()
        cy.wait(2000)
        cy.get('#jqgh_MedicalItemGridView_CreatedDate').click()
        cy.wait(2000)

        cy.get('#MedicalItemGridView')
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
                        .should('have.text', 'Other')
                        cy.get('td:nth-child(4)') 
                        .should('have.text', randomNumbers)
                        cy.get('td:nth-child(5)') 
                        .should('have.text', 'Each')
                        cy.get('td:nth-child(6)') 
                        .should('have.text', '1' + randomNumbers)
            })
            })
    })
})