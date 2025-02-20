import { getRandomNumbers, login } from '../../support/function.js';

const randomNumbers = getRandomNumbers(2);

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

describe('Navigating to Carcass Tab', () => {

    it('Select Animal ID and Carcass Tab', () => {

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('WASAUTO-T')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')
        cy.contains('#Carcass > a', 'Carcass').should('be.visible').click()
    })


    // VERIFY DROPDOWNS
    //
    it('should verify all dropdowns are visible and interactable', () => {
        cy.get('#ddlCProgram').should('be.visible');   // Program dropdown
        cy.get('#ddlCCustomer').should('be.visible');  // Customer dropdown
        cy.get('#txtCDateSold').should('be.visible');     // Date Sold
        cy.get('#txtCKillDate').should('be.visible');     // Kill Date
    });


    // VERIFY CHECKBOXES

    it('should verify the Premium and Discount checkboxes', () => {
        cy.get('#chkCPremium').should('be.visible')
        cy.get('#chkCDiscount').should('be.visible')

    });

})

describe('Fill in all fields and update', () => {

    it('Fill in all fields', () => {
        // Log the random numbers 
        cy.log(`Random Numbers: ${randomNumbers}`);
        // VERIFY LEFT-SIDE INPUT FIELDS
        cy.get('#txtCLHotWeight').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCLYieldGrade').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCLQualityGrade').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCLDressing').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCLMarblingScore').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCLRibeyeArea').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCLBackFat').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCLMaturity').should('be.visible').focus().clear().type(randomNumbers)

        // VERIFY RIGHT-SIDE INPUT FIELDS

        cy.get('#txtCRHotWeight').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCRYieldGrade').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCRQualityGrade').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCRDressing').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCRMarblingScore').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCRRibeyeArea').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCRBackFat').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtCRMaturity').should('be.visible').focus().clear().type(randomNumbers)
    })
    // VERIFY SAVE BUTTON
    it('Click on save', () => {

        cy.get('#btnCupdate').should('be.visible').click();
        cy.get('#popup_ok').click()
        cy.wait(2000)
    });

})

describe('Verify Updated Carcass data', () => {

    it('Select Animal ID and Carcass Tab', () => {

        cy.reload()
        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('WASAUTO-T')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')
        cy.contains('#Carcass > a', 'Carcass').should('be.visible').click()
    })

    it('Verify all Updated data Fields', () => {

        // Log the random numbers 
        cy.log(`Random Numbers: ${randomNumbers}`);

        cy.get('#txtCLHotWeight').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCLYieldGrade').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCLQualityGrade').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCLDressing').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCLMarblingScore').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCLRibeyeArea').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCLBackFat').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCLMaturity').should('be.visible').and('have.value', randomNumbers);

        // VERIFY RIGHT-SIDE INPUT FIELDS

        cy.get('#txtCRHotWeight').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCRYieldGrade').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCRQualityGrade').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCRDressing').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCRMarblingScore').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCRRibeyeArea').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCRBackFat').should('be.visible').and('have.value', randomNumbers);
        cy.get('#txtCRMaturity').should('be.visible').and('have.value', randomNumbers);
    });
})
