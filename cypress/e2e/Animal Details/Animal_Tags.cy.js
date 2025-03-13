import { getRandomNumbers, login } from '../../support/function.js';

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

describe('Navigating to Tags Tab, ', () => {

    it('Select Animal ID and Tags Tab', () => {

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('WASAUTO-T')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')
        cy.contains('#Tags > a', 'Tags').should('be.visible').click()
    })
})

describe('Add New Tag and verify', () => {

    const randomNumbers = getRandomNumbers(3);

    it('Add New Tag', () => {
    // Log the random numbers 
    cy.log(`Random Numbers: ${randomNumbers}`);

    cy.get('#btnTAddTag').should('be.visible').click()
    cy.get('#edithdproductAnimalDetailTagGridView').should('be.visible')
    cy.get('#TAG_NUMBER').focus().clear().type(randomNumbers)
    cy.get('#TAG_DESCRIPTION').focus().clear().type(randomNumbers)
    cy.get('#sData').click()
    cy.get('#popup_ok').click()

    })

    it('Verify New Tag', () => {
    // Log the random numbers 
    cy.log(`Random Numbers: ${randomNumbers}`);
    cy.get('[aria-describedby="productAnimalDetailTagGridView_TAG_NUMBER"]').should('be.visible').and('contain', randomNumbers)
    cy.get('[aria-describedby="productAnimalDetailTagGridView_TAG_DESCRIPTION"]').should('be.visible').and('contain', randomNumbers)
    })
})

// describe('Update Tag and verify', () => {

//     const randomNumbers = getRandomNumbers(3);

//     it('Update Tag', () => {
//     // Log the random numbers 
//     cy.log(`Random Numbers: ${randomNumbers}`);

//     cy.get('.EditBtn').should('be.visible').click()
//     cy.get('.CancelBtn').should('be.visible')
//     cy.get(`#JHS31_TAG_NUMBER`).should('be.visible').clear().type(randomNumbers)
//     cy.get('#JHS31_TAG_DESCRIPTION"]').should('be.visible').clear().type(randomNumbers)
//     cy.get('.SaveBtn').click()
//     cy.get('#popup_ok').click()

//     })

//     it('Verify Tag is updated', () => {
//     // Log the random numbers 
//     cy.log(`Random Numbers: ${randomNumbers}`);
//     cy.get('[aria-describedby="productAnimalDetailTagGridView_TAG_NUMBER"]').should('be.visible')
//     .and('contain', randomNumbers)
//     cy.get('[aria-describedby="productAnimalDetailTagGridView_TAG_DESCRIPTION"]').should('be.visible')
//     .and('contain', randomNumbers)
//     })
// })

describe('Delete Tag and Verify', () => {


    it('Delete Tag and Verify', () => {
    cy.get('.rationtypeDelete.DeleteBtn[value="DELETE"]')
    .should('be.visible').click()
    cy.contains('#popup_message > .SucessMsg', 'Animal Detail Tag has been deleted successfully. ')
    cy.get('#popup_ok').click()
    })
})