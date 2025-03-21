import { loginSandbox } from '../../support/function.js';


describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})

describe('Re-Processing', () => {

    it('NAVIGATION TO Processing > Re-Processing', () => {
        //Re-Processing
        cy.get('#Item_COR16').click()
        cy.get('#Item_COR22', { force: true }).click()

    })

    it('Verify the presence of form Header', () => {
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Re-Processing').should('be.visible')

    })

    it('Select Pen', () => {
        cy.get('#txtPPenNumber').focus().clear().type('W001{downarrow}{enter}')
    })

    it('Add Processed head and select Regimen', () => {
        cy.wait(2000)
        cy.get('#txtProcessHead').focus().clear().type('1')
        cy.get('#ddlRegimentDescriptions').select('AmPasture')
        cy.wait(2000)
    })

    it('Verify details are populated automatically', () => {
        cy.get('#txtAvgProcessWeight').then(($input) => {
            expect($input.val()).to.not.be.empty;
        });


    })

    it('Select Regimen', () => {
        cy.get('tr > :nth-child(1) > select').select('SynoGr (200 Days)')
        cy.wait(2000)

    });



    it('Save and verify animal is reprocessed', () => {
        cy.get('#btnSave').click()
        cy.get('#popup_message').should('contain', 'Reprocess has been saved successfully')
        cy.wait(2000)
        cy.get('#popup_ok').click()


        cy.get('#txtProcessHead').then(($input) => {
            expect($input.val()).to.be.empty;
        });

    })
})