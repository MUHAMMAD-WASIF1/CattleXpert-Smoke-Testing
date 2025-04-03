import { loginSandbox } from '../../../support/function.js';



describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})


describe('Add NEw Implants and verify', () => {

    it('NAVIGATION TO System Setup > Health > Implants', () => {
        //Implants
        cy.get('#Item_COR48').click()
        cy.get('#Item_COR92').click()
        cy.get('#Item_COR96').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Implants').should('be.visible')

    })

    it('Add new Implant', () => {
        cy.get('#txtImplant').focus().type('Revalor G{downarrow}{enter}')
        cy.wait(2000)
        cy.get('#txtGender').focus().type('Bull-Male{downarrow}{enter}')
        cy.wait(2000)
        cy.get('#btnAddRow').click()
        cy.wait(2000)
        cy.get('#1_MinWeight').focus().type('100')
        cy.get('#1_MaxWeight').focus().type('1000')
        cy.get('#1_Notes').focus().type('TEST')

        cy.get('.SaveBtn').click()
        cy.wait(1000)
        cy.get('#popup_message').should('contain', 'Medical Implant has been inserted successfully')
        cy.wait(1000)
        cy.get('#popup_ok').click()
    })

    it('Verify New Implant', () => {

        

        cy.get('#MedicalImplantGridView')
        .should('be.visible')
        .within(() => {
            cy.get('tr[role="row"]') // Select all rows within the table body
                .eq(1) // Get the *first* row
                .within(() => {
                    cy.get('td:nth-child(3)') 
                    .should('have.text', '100')
                        cy.get('td:nth-child(4)') 
                        .should('have.text', '1000')
                        cy.get('td:nth-child(7)') 
                        .should('have.text', 'TEST')

                })
        })
    })

    it('Delete New Implant', () => {

        cy.get('.DeleteBtn').click()
        cy.wait(1000)
        cy.get('#popup_message').should('contain', 'Are you sure want to delete')
        cy.wait(1000)
        cy.get('#popup_ok').click()
        cy.wait(1000)
        cy.get('#popup_message').should('contain', 'Medical Implant has been deleted successfully')
        cy.wait(1000)
        cy.get('#popup_ok').click()
    })
})

