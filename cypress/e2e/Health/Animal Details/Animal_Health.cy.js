import { loginSandbox } from '../../../support/function.js';

// REMINDER : Before running tests, make sure the animal is available in the system and the animal is not treated, realized or dead.
// Change the animal numbers manually for all three treat, realized or dead.
// TreatID, DeadID and RealizeID are the animal numbers which are used in the test cases.
// Make sure the animal numbers are not same.

let TreatID = 'LA-05';
let DeadID = 'LA-06';
let RealizeID = 'LA-07';


describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})

describe('NAVIGATION TO HEALTH > Animal Details', () => {

    it('NAVIGATION TO HEALTH > Animal Details', () => {
        //Animal Details
        cy.get('#Item_COR31').click()
        cy.get('#lnkAnimalDetail').click()

    })
    it('verify the presence of form Header', () => {
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Animal Details').should('be.visible')
    })
})

describe('Navigating to Animal Health Tab and verify UI', () => {

    it('Select Animal ID and Animal Health Tab', () => {
        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('LA-01')
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

////////////////////////////////////////////////////////////////////////

describe('Treat An animal', () => {

    it('NAVIGATION TO HEALTH > Treat/Dead/Realize', () => {
        //Treat/Dead/Realize
        cy.get('#Item_COR31').click()
        cy.get('#lnkAnimalTreatment').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Treat/Dead/Realize').should('be.visible')
    })

    it('Select animal and verify', () => {
        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type(TreatID)
        //Random click to fetch data
        cy.get('.relative > .red').click()
        cy.wait(2000)

        //assertion to verify animal is selected
        cy.get('#txtCurrentWT').then(($input) => {
            expect($input.val()).to.not.be.empty;
        });

    })

    it('Fill the form to treat animal', () => {
        cy.get('#ddlDiagnosis').should('be.visible').select('Bloat')
        cy.get('#ddlTreatment').should('be.visible').select('Bloat')
        cy.get('#ddlTreatmentPerson').should('be.visible').select('Sruthi')
        cy.get('#rbHospital').click()
        cy.get('#ddlToPen').should('be.visible').select('HO20')
    });

    it('Save animal', () => {
        cy.get('#bttnTreatmentSave').should('be.visible').click()
        cy.get('#popup_message > .SucessMsg').should('contain', 'Animal Treatment has been saved successfully')
        cy.get('#popup_ok').click()
    })

    it('Navigating to Animal Health Tab and Verify animal is Treated', () => {
        //Animal Details
        cy.get('#Item_COR31').click()
        cy.get('#lnkAnimalDetail').click()

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type(TreatID)
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')
        cy.contains('#Health > a', 'Health').should('be.visible').click()

        cy.get('#txtHPullCount').should('be.visible').and('have.value', '1')

        cy.get('#PullGridView')
        .should('be.visible')
        .within(() => {
            cy.get('tr[role="row"]') // Select all rows within the table body
            .eq(1) // Get the *first* row
            .within(() => {
                cy.get('td:nth-child(2)') 
                .should('have.text', 'Bloat')
                    cy.get('td:nth-child(3)') 
                    .should('have.text', 'Bloat')
                    
        })
        })

    })
});

describe('Make animal as Dead', () => {

    it('NAVIGATION TO HEALTH > Treat/Dead/Realize', () => {
        //Treat/Dead/Realize
        cy.get('#Item_COR31').click()
        cy.get('#lnkAnimalTreatment').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Treat/Dead/Realize').should('be.visible')
    })

    it('Select animal and verify Selected', () => {

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type(DeadID)
        //Random click to fetch data
        cy.get('.relative > .red').click()
        cy.wait(2000)
        // assertion to verify animal is selected
        cy.get('#txtCurrentWT').then(($input) => {
            expect($input.val()).to.not.be.empty;
        })
    })


    it('Select Dead tab and Fill details', () => {
        cy.get('#Dead > .red').should('be.visible').click()
        cy.get('#ddlDeadReason').should('be.visible').select('Brainer')

    });

    it('Save animal', () => {
        cy.get('#bttnDeadSave').should('be.visible').click()
        cy.get('#popup_message > .SucessMsg').should('contain', 'Animal dead saved successfully')
        cy.get('#popup_ok').click()
    })

    it('Navigating to Animal Health Tab and Verify animal is Dead', () => {
        //Animal Details
        cy.get('#Item_COR31').click()
        cy.get('#lnkAnimalDetail').click()

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type(DeadID)
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').contains('Dead')
        cy.contains('#Health > a', 'Health').should('be.visible').click()

        cy.get('#txtHDeadReason').should('be.visible').and('have.value', 'Brainer')

    })

});

describe('Make animal as Realized', () => {

    it('NAVIGATION TO HEALTH > Treat/Dead/Realize', () => {
        //Treat/Dead/Realize
        cy.get('#Item_COR31').click()
        cy.get('#lnkAnimalTreatment').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Treat/Dead/Realize').should('be.visible')
    })

    it('Select animal and verify Selected', () => {

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type(RealizeID)
        //Random click to fetch data
        cy.get('.relative > .red').click()
        cy.wait(2000)
        // assertion to verify animal is selected
        cy.get('#txtCurrentWT').then(($input) => {
            expect($input.val()).to.not.be.empty;
        })
    })


    it('Select Realize tab and Fill details', () => {
        cy.get('#Realize > .blue').should('be.visible').click()
        cy.get('#ddlRealizeReason').should('be.visible').select('Brainer')
        cy.get('#txtRealizePayWT').focus().clear().type('500')

    });

    it('Save animal', () => {
        cy.get('#bttnRealizeSave').should('be.visible').click()
        cy.get('#popup_message > .SucessMsg').should('contain', 'Animal realizer saved successfully')
        cy.get('#popup_ok').click()
    })

    it('Navigating to Animal Health Tab and Verify animal is Realized', () => {

        //Animal Details
        cy.get('#Item_COR31').click()
        cy.get('#lnkAnimalDetail').click()

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type(RealizeID)
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').contains('Realized')
        cy.contains('#Health > a', 'Health').should('be.visible').click()

        cy.get('#txtHRealizeDate').then(($input) => {
            expect($input.val()).to.not.be.empty;
        })

    })

});
