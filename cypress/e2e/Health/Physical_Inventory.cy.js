import { getRandomNumbers, login } from '../../support/function.js';
import 'cypress-xpath';

// Generate a random string
const randomNumbers = getRandomNumbers(3);

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        login();
    })
})

describe('Medical Item Tab', () => {

    it('NAVIGATION TO HEALTH > Physical Inventory', () => {
        //Physical Inventory
        cy.get('#Item_JHS31').click()
        cy.get('#Item_JHS293').click()

    })
    it('Verify the presence of form Header', () => {
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Physical Inventory').should('be.visible')
    })

    it('Select medical item', () => {
        cy.xpath('//*[@id="JHS65"]/td[1]').click()
    })

    it('Edit details and fill in data', () => {
        cy.get('#ddlMContainerUOM').select('JHS10')
        cy.get('#txtMQuantity').focus().clear().type(randomNumbers)
        cy.get('.mrg0 > .w40 > .red > span').click()
        cy.get('#ddlMContainerType').select('JHS1')
        cy.get('#txtMTotalContainers').focus().clear().type(randomNumbers)


    })

    it('Save detals', () => {
        cy.get('#btnMSave').should('be.visible').click()
        cy.get('#popup_message > .SucessMsg').should('contain', 'Medical Item Adjustments has been saved successfully')
        cy.get('#popup_ok').click()
    })

    it('Select updated medical item from grid and verify data', () => {
        cy.get('#MedicalItemGridView')
            .should('be.visible')
            .within(() => {
                cy.get('tr[role="row"]') // Select all rows within the table body
                    .eq(1) // Get the *first* row
                    .within(() => {
                        cy.get('td:nth-child(4)')
                            .should('contain', randomNumbers); // 4th cell (index starts at 1)
                        cy.get('td:nth-child(8)') // 8th cell (index starts at 1) 
                            .should('contain', randomNumbers);

                    });

            })
    })

})



