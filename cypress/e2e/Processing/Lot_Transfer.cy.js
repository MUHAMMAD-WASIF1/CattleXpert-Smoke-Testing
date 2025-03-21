import { loginSandbox, getRandomNumbers } from '../../support/function.js';
import 'cypress-xpath';
// Generate random Number
const randomNumbers = getRandomNumbers(4);

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})
// cy.get('#txtCurrentHead')
describe('Lot Transfer', () => {

    it('NAVIGATION TO Processing > Lot Transfer', () => {
        //Lot Transfer
        cy.get('#Item_COR16').click()
        cy.get('#Item_COR141').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Lot Transfer').should('be.visible')
    })

    it('Select From Pen and From LOT to transfer', () => {
        cy.get('#txtFromPen').focus().clear().type('0010{downarrow}{enter}')

    })

    it('Select same pen and create lot', () => {
        cy.wait(2000)
        cy.get('#btnSamePen').click()
        cy.get('#NewLotNumberPopup').should('be.visible')
        cy.get('#chkCreateNewLot').check()

        // Wait for the input to be visible and force the interaction
        cy.get('#txtLotNumber1')
            .should('exist')
            .invoke('show') // Make the element visible
            .clear()
            .type(randomNumbers, { force: true }) // Force the type action

        cy.get('[style="margin-top:4%"] > .w30 > label > span').click()
        cy.get('[style="margin-top:4%"] > .clr > #btnSaveLotNumber').click()
        cy.get('#popup_message > .SucessMsg').should('contain', 'New lot scheduled successfully')
        cy.get('#popup_ok').click()

    })

    it('Add info in grid for new lot', () => {

        cy.get('#productGridView')
            .should('be.visible')
            .within(() => {
                cy.get('tr[role="row"]') // Select all rows within the table body
                    .eq(1) // Get the *first* row
                    .within(() => {
                        cy.get('td:nth-child(2)')
                            .should('contain', randomNumbers); // 2nd cell (index starts at 1)
                        cy.get('td:nth-child(12)') // 12th cell Max Weight
                            .click().type('{selectall}{backspace}').type('500');
                        cy.get('td:nth-child(13)') // 13th cell Heads
                            .click().type('{selectall}{backspace}').type('1');
                        cy.get('td:nth-child(14)') // 14th cell Total Weight
                            .click().type('{selectall}{backspace}').type('500');

                    })
            })
    })

    it('Save info and tranfer lot', () => {

        cy.xpath('/html/body/form/section[1]/section[2]/section/section[1]/article/section/div/section[3]/div/div/div[3]/div[6]/table/tbody/tr[2]/td/input[1]').click()
        cy.get('#popup_message > .SucessMsg').should('contain', 'Lot Transfer has been updated successfully')
        cy.get('#popup_ok').click()

        cy.get('#btnTransfer').click()
        cy.get('#popup_message').should('contain', 'Are you sure you want to do partial transfer')
        cy.get('#popup_ok').click()


        cy.get('#popup_message').should('contain', 'Verfied all values')
        cy.get('#popup_ok').click()

        cy.get('#popup_message').should('contain', 'Lot Transfer successfully')
        cy.wait(2000)
        cy.get('#popup_ok').click()

    })
})