import { getRandomNumbers, login } from '../../support/function.js';
import dayjs from 'dayjs';


// Adjust format as needed
const formattedToday = dayjs().format('MM/DD/YYYY');

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

describe('Navigating to Breeding Tab, ', () => {

    it('Select Animal ID and Breeding Tab', () => {

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('WASAUTO-T')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')
        cy.contains('#Breeding > a', 'Breeding').should('be.visible').click()
    })
})

describe('Add New Breeding Event and verify', () => {

    // Get random numbers
    const randomNumbers = getRandomNumbers(2);

    it('Navigating to  Breeding screen', () => {
        cy.get('#btnPWBreedingScreen')
            .then(newTab => {
                const hrefTab = newTab.prop('href')
                cy.visit('https://clientdemos.cattlexpert.com/Cattlexpert.UI/BreedingScreen.aspx#lnkBreedingScreen')
            })
        cy.contains('#formcontainer > .curvetop > span[lang="en"]', 'Breeding Screen').should('be.visible')
    })

    it('Add New Breeding Event', () => {

        // Log the random String 
        cy.log(`Random numbers: ${randomNumbers}`);

        //Select Animal 
        cy.get('#txtBAnimalID')
            .focus()
            .type('WASAUTO-T')
        //Random click to fetch data
        cy.contains('#formcontainer > .curvetop > span[lang="en"]', 'Breeding Screen').should('be.visible').click()
        cy.wait(2000)


        cy.get('#ddlBMoveTo').should('be.visible').select('JHS95')
        cy.get('#ddlBSire').should('be.visible').select('JHS1')
        cy.get('#ddlBEvent').should('be.visible').select('JHS1')
        cy.get('#txtareaBNotes').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtBDate').should('be.visible').type(formattedToday);
        cy.get('#ddlBReproStatus').should('be.visible').select('JHS1')
        cy.get('#ddlBTechnician').should('be.visible').select('JHS23')
        cy.get('#ddlBCondition').should('be.visible').select('JHS1')

        cy.get('#chkBBullBreeding').should('be.visible').check()
        cy.get('#txtBDaysBreed').should('be.visible')
        // .focus().clear().type(randomNumbers)

        cy.get('#btnSave').click()
        cy.get('#popup_ok').click()

    })

    it('Verify New Breeding Event', () => {


        //Animal Details
        cy.get('#Item_JHS31').click()
        cy.get('#lnkAnimalDetail').click()
        cy.get('#popup_cancel').click()

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('WASAUTO-T')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')
        cy.contains('#Breeding > a', 'Breeding').should('be.visible').click()

        cy.get('[aria-describedby="productAnimalDetailBreedingGridView_NOTES"]').and('contain', randomNumbers)

    })
})

describe('Edit Breeding Event and verify', () => {

    // Get random numbers
    const randomNumbers = getRandomNumbers(3);

    it('Edit Breeding Event', () => {
        // Log the random String 
        cy.log(`Random numbers: ${randomNumbers}`);

        cy.get('[aria-describedby="productAnimalDetailBreedingGridView_NOTES"]').click()
        cy.get('#txtareaBNotes').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#btnPSave').click()
        cy.get('#popup_ok')
    })

    it('Verify Breeding Event edited', () => {

        cy.get('[aria-describedby="productAnimalDetailBreedingGridView_NOTES"]').and('contain', randomNumbers)

    })
})

describe('Delete New Breeding Event and verify', () => {

    it('Delete New Breeding Event and verify', () => {

        cy.get('[aria-describedby="productAnimalDetailBreedingGridView_NOTES"]').click()
        cy.get('.Deleterecord').click()
        cy.get('#popup_ok').click()
        cy.get('#popup_ok').click()

    })
})
