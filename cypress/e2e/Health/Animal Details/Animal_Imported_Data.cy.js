import { getRandomNumbers, login } from '../../../support/function.js';


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

describe('Navigating to Imported Data Tab, ', () => {

    it('Select Animal ID and Imported Data Tab', () => {

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('WASAUTO-T')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')
        cy.get('li').contains('Imported Data').click();
        
    })
})

describe('Add New Record and verify', () => {

    const randomNumbers = getRandomNumbers(3);

    it('Add New Record', () => {

        cy.get('#btnUAddRecord').should('be.visible').click()
        cy.get('#edithdproductAnimalImportDataGridView').should('be.visible')
        cy.get('#FIELD_LABEL').focus().clear().type(randomNumbers)
        cy.get('#FIELD_VALUE').focus().clear().type(randomNumbers)
    cy.get('#sData').click()
    cy.get('#popup_ok').click()

    })

    it('Verify New Record', () => {
    
        cy.get('[aria-describedby="productAnimalImportDataGridView_FIELD_LABEL"]').should('be.visible').and('contain', randomNumbers)
        cy.get('[aria-describedby="productAnimalImportDataGridView_FIELD_VALUE"]').should('be.visible').and('contain', randomNumbers)
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

describe('Delete Record and Verify', () => {


    it('Delete Record and Verify', () => {
    cy.get('.rationtypeDelete.DeleteBtn[value="DELETE"]')
    .should('be.visible').click()
    cy.contains('#popup_message > .SucessMsg', 'Animal Import Data has been deleted successfully. ')
    cy.get('#popup_ok').click()
    })
}) 