import { loginSandbox, getRandomNumbers } from '../../support/function.js';

// Generate random Number
const randomNumbers = getRandomNumbers(4);

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})

describe('Lot Merge', () => {

    it('NAVIGATION TO Processing > Lot Merge', () => {
        //Lot Merge
        cy.get('#Item_COR16').click()
        cy.get('#Item_COR139', { force: true }).click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Lot Merge').should('be.visible')
    })

    it('Select location and LOT A & LOT B to merge', () => {
        cy.get('#ddlLocations').select('All')
        cy.wait(2000)

        cy.get('#gview_lotAgridView')
            .should('be.visible')
            .within(() => {
                cy.get('td[aria-describedby="lotAgridView_Owner"]')
                    .contains('jackson').should('be.visible').click();

            })

        cy.get('#gview_lotBgridView')
            .should('be.visible')
            .within(() => {
                cy.get('td[aria-describedby="lotBgridView_Owner"]')
                    .contains('jackson').should('be.visible').click();

            })
    })
    it('Merge the selected lot into new lot number', () => {

        cy.get('#txtLotCNumber').focus().clear().type(randomNumbers)
        cy.get('#btnMerge').click()
        cy.get('#popup_message > .SucessMsg').should('contain', 'Lot merge has been done successfully')
        cy.get('#popup_ok').click()
    })

})

describe('Verify Lot Merged Successfully', () => {

    it('NAVIGATION TO Processing > Lot Details', () => {
        //Lot Details
        cy.get('#Item_COR16').click()
        cy.get('#Item_COR18').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Lot Details').should('be.visible')

        cy.get('#txtEditLotNumber').focus().clear().type(randomNumbers,'{downarrow}{enter}')
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > .red > span').click()
        cy.get('#lnkMergeStatus').should('be.visible')
    })
})