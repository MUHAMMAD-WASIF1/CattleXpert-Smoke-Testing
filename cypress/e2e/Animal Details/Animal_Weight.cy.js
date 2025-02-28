import { getRandomNumbers, login } from '../../support/function.js';


// Generate a random string
const randomNumbers = getRandomNumbers(3);


describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        login();
    })
})

describe('NAVIGATION TO HEALTH > Animal Details', () => {

    it('NAVIGATION TO HEALTH > Animal Details', () => {
        //Animal Details
        cy.get('#Item_JHS31').click()
        cy.get('#lnkAnimalDetail').click()

    })
    it('verify the presence of form Header', () => {
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Animal Details').should('be.visible')
    })
})

describe('Navigating to Animal Weight Tab and Add Weight', () => {

    it('Select Animal ID', () => {
        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('WASAUTO-T')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')

    })

    it('Navigating to Annimal Weight and add weight', () => {
        cy.contains('#tab_Weight', 'Weights').should('be.visible').click();
        cy.wait(2000)
        cy.get('#lnkAddWeight').then(newTab => {
            const hrefTab = newTab.prop('href')
            cy.visit(hrefTab)
        })
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Add Weight').should('be.visible')

        //Select Animal 
        cy.get('#txtPAnimal')
            .focus()
            .type('WASAUTO-T')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)

        // Log the random numbers 
        cy.log(`Random Numbers: ${randomNumbers}`);
        // Typing numbers in weight field
        cy.get('#txtWeight').should('be.visible')
            .focus().clear().type(randomNumbers);

        cy.get('#btnAnimalWeightSave').click()
        cy.get('#popup_ok').click()
    })

    it('Verify Animal Weight added', () => {
        // Navigate to Animal Details
        cy.get('#Item_JHS31').click()
        cy.get('#lnkAnimalDetail').click()

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('WASAUTO-T')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')
        // Select weight tab
        cy.contains('#tab_Weight', 'Weights').should('be.visible').click();
        cy.wait(2000)
        cy.get('[aria-describedby="LoadAnimalWeightGridView_WGHT"]')
            .should('be.visible')
            .and('contain', randomNumbers);

    })

    it('Delete Animal Weight', () => {
        cy.get('[aria-describedby="LoadAnimalWeightGridView_WGHT"]')
            .should('be.visible')
            .and('contain', randomNumbers).click()
        cy.get('#lnkDeleteWeight').click()
        cy.get('#popup_ok').click()
        cy.contains('#popup_message', 'Animal Weight has been deleted successfully')

    })
})