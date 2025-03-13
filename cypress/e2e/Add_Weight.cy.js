import { getRandomNumbers, login } from '../support/function.js';


// Generate random Number
const randomNumbers = getRandomNumbers(3);

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        login();
    })
})

describe('NAVIGATION TO HEALTH > Add Weight', () => {

    it('NAVIGATION TO HEALTH > Add Weight', () => {
        //Add Weight
        cy.get('#Item_JHS31').click()
        cy.get('#lnkAddWeight').click()

    })
    it('Verify the presence of form Header', () => {
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Add Weight').should('be.visible')
    })
})

describe('Select Animal and Add Weight', () => {


    it('Select Animal', () => {

        //Select Animal 
        cy.get('#txtPAnimal')
            .focus()
            .type('2-WASAUTO-10')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
    })

    it('Add Weight to Animal', () => {

        // Typing numbers in weight field
        cy.get('#txtWeight').should('be.visible')
            .focus().clear().type(randomNumbers);

        cy.get('#btnAnimalWeightSave').click()
        cy.get('#popup_ok').click()
    })


})

describe('Select Same Animal again and Verify Added Weight', () => {

    it('Reload Page', () => {

        cy.reload()

    })


    it('Selecting same Animal', () => {

        //Select Animal 
        cy.get('#txtPAnimal')
            .focus()
            .type('2-WASAUTO-10')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
    })

    it('Verify Weight Added to Animal', () => {

        // Verifying numbers in weight field
        cy.get('#txtWeight').should('be.visible')
            .and('have.value', randomNumbers);

    })


})