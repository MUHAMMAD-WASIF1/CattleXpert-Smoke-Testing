import { loginSandbox } from '../../support/function.js';


describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})

describe('Performance Sort', () => {

    it('NAVIGATION TO Processing > Performance Sort', () => {
     //Performance Sort
     cy.get('#Item_COR16').click()
     cy.get('#Item_COR21').click()

    })

    it('Verify the presence of form Header', () => {
        cy.contains('#formcontainer > h1 > span:nth-child(2)','Performance Sort').should('be.visible')
    })

    it('Select Pen', () => {
        cy.get('#txtFromPen').focus().clear().type('W001{downarrow}{enter}')     
        })

        it('Add Scale Weight And Capture Weight', () => {
            cy.wait(2000)
            cy.get('#txtScale').focus().clear().type('450')
            cy.wait(2000)
            cy.get('#btnCaptureWeight').click()
            cy.wait(2000)
        })
    
        it('Verify Animal number is generated automatically', () => {
            cy.get('#txtAnimalNumber').then(($input) => {
                expect($input.val()).to.not.be.empty;
              });
              cy.get('#txtCurrentWeight').then(($input) => {
                expect($input.val()).to.not.be.empty;
              });
            
        })
    
        it('Click Process button and verify animal is processed', () => {
            cy.get('#btnProcess').click()
            cy.wait(2000)
            cy.get('#txtAnimalNumber').then(($input) => {
                expect($input.val()).to.be.empty;
            });
            cy.get('#txtScale').then(($input) => {
                expect($input.val()).to.be.empty;
            });
        })
})