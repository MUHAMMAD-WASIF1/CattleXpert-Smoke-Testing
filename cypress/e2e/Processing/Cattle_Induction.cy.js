import { login } from '../../support/function.js';


describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        login();
    })
})

describe('Cattle Induction Processing', () => {

    it('NAVIGATION TO Processing > Cattle Induction Processing', () => {
    //Cattle Induction Processing
    cy.get('#Item_JHS16').click()
    cy.get('#Item_JHS17').click()

    })

    it('Verify the presence of form Header', () => {
        cy.contains('#formcontainer > h1 > span:nth-child(2)','Cattle Induction Processing').should('be.visible')
    })

    it('Select Cattle Buy', () => {
        cy.get('#productChuteSideScreenGridView')
            .should('be.visible')
            .within(() => {
                cy.get('td[aria-describedby="productChuteSideScreenGridView_CATL_BUY_NBR"]')
                .contains('J101688').should('be.visible').click();
                
            })
    })

    it('Add Scale Weight And Capture button Weight', () => {
        cy.get('#txtScale').focus().clear().type('450')
        cy.wait(2000)
        cy.get('#btnCaptureWeight').click()
        cy.wait(2000)
    })

    it('Verify Animal number is generated automatically', () => {
        cy.get('#txtAnimalNO').then(($input) => {
            expect($input.val()).to.not.be.empty;
          });
        cy.get('#txtCurrentWt').then(($input) => {
            expect($input.val()).to.not.be.empty;
          });
        
    })

    it('Click Process button and verify animal is processed', () => {
        cy.get('#btnProcess').click()
        cy.wait(2000)
        cy.get('#txtAnimalNO').then(($input) => {
            expect($input.val()).to.be.empty;
        });
        cy.get('#txtScale').then(($input) => {
            expect($input.val()).to.be.empty;
        });
    })
})

