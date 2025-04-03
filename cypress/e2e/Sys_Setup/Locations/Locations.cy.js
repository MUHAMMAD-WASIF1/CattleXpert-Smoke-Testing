import { loginSandbox, getRandomNumbers, getRandomString } from '../../../support/function.js';
const randomNumbers = getRandomNumbers(3);
const randomString = getRandomString(4);

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})


describe('Create New Locations and Verify', () => {

    it('NAVIGATION TO System Setup > Location > Locations', () => {
    //Locations
    cy.get('#Item_COR48').click()
    cy.get('#Item_COR118').click()
    cy.get('#Item_COR119').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Locations').should('be.visible')
    
    })

    it('Create New Locations', () => {
        
        cy.get('#txtLocationName').focus().clear().type('A'+randomString)
        cy.get('#txtLocationShortName').focus().clear().type(randomString)
        cy.get('#txtLocationCode').focus().clear().type(randomNumbers)
        cy.get('#ddlLocationType').select('Corporate')

        cy.get('#btnSave').click()
        cy.get('#popup_message > .SucessMsg').should('contain', 'Location has been saved successfully')
        cy.wait(2000)
        cy.get('#popup_ok').click()
    })

    it('Verify New Location', () => {
        cy.get('#productGridView')
            .should('be.visible')
            .within(() => {
                cy.get('td[aria-describedby="productGridView_LOCATIONNAME"]')
                .contains(randomString).should('be.visible')
                cy.get('td[aria-describedby="productGridView_LOCATIONCODE"]')
                .contains(randomNumbers).should('be.visible') 
                cy.get('td[aria-describedby="productGridView_StatusFlag"]')
                .contains('YES').should('be.visible') 


    })
})

})