import { login } from '../../support/function.js';


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

describe('Navigating to Animal Health Tab and verify', () => {

    it('Select Animal ID and Animal Health Tab', () => {
        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('WASAUTO-T')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')
        cy.contains('#Health > a', 'Health').should('be.visible').click()
    })

    it('should verify all labels (text) are present and visible', () => {
        // 2. Define the list of label texts you want to check
        const labels = [
            'Current Implant',
            'Date Implanted',
            'Expiration Date',
            'Process Cost',
            'Medical Cost',
            'Clear Mkt. Week',
            'Effective Drug',
            'Pull Count',
            'Repull Count',
            'Retreat Count',
            'New Pull Count',
            'Dead Date',
            'Dead Reason',
            'Realize Date'
        ];

        // 3. Loop through each label text and assert it's visible
        labels.forEach((labelText) => {
            cy.contains(labelText).should('be.visible');
        });
    });

    it('Verify all fields are visible', () => {
        // 1) Current Implant
        cy.get('#txtHCurrentImplant')
            .should('be.visible')
        // .and('have.value', '')             

        // 2) Date Implanted
        cy.get('#txtHDateImplanted')
            .should('be.visible')
        // .and('have.value', '')

        // 3) Expiration Date
        cy.get('#txtHExpirationDate')
            .should('be.visible')
        // .and('have.value', '')

        // 4) Process Cost
        cy.get('#txtProcessCost')
            .should('be.visible')
        // .and('have.value', '0.00')

        // 5) Medical Cost
        cy.get('#txtHMedicalCost')
            .should('be.visible')
        // .and('have.value', '0.00')

        // 6) Clear Mkt. Week
        cy.get('#txtHClearMktWeek')
            .should('be.visible')
        // .and('have.value', '0')

        // 7) Effective Drug
        cy.get('#txtHEffectiveDrug')
            .should('be.visible')
        // .and('have.value', '')

        // 8) Pull Count
        cy.get('#txtHPullCount')
            .should('be.visible')
        // .and('have.value', '0')

        // 9) Repull Count
        cy.get('#txtHRepullCount')
            .should('be.visible')
        // .and('have.value', '0')

        // 10) Retreat Count
        cy.get('#txtHRetreatCount')
            .should('be.visible')
        // .and('have.value', '0')

        // 11) New Pull Count
        cy.get('#txtHNewPullCount')
            .should('be.visible')
        // .and('have.value', '0')

        // 12) Dead Date
        cy.get('#txtHDeadDate')
            .should('be.visible')
        // .and('have.value', '')

        // 13) Dead Reason
        cy.get('#txtHDeadReason')
            .should('be.visible')
        // .and('have.value', '')

        // 14) Realize Date
        cy.get('#txtHRealizeDate')
            .should('be.visible')
        // .and('have.value', '')
    })

})