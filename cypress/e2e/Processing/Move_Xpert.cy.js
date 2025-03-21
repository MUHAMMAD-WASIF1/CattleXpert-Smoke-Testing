import { loginSandbox } from '../../support/function.js';

let storedIncrementedValue;

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        loginSandbox();
    })
})

describe('Navigate to Pen Details and get heads value to verify later', () => {

    it('NAVIGATION TO Processing > Pen Details', () => {
    //Pen Details
    cy.get('#Item_COR16').click()
    cy.get('#Item_COR20').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Pen Details').should('be.visible')

    })

    it('Select Pen and get headcount value', () => {
        //Pen Details
        cy.get('#txtPenNumber').focus().clear().type('0002{downarrow}{enter}')
        cy.wait(3000)
    
        cy.get('#txtInPen')
        .should('exist')
            .and('be.visible')
            .then($field => {
                // Log all possible ways to get the value
                cy.log('Field properties:', {
                    jquery_val: $field.val(),
                    prop_value: $field.prop('value'),
                    attr_value: $field.attr('value'),
                    text_content: $field.text(),
                    html: $field.html()
                });

                // Try to get the value using different methods
                const fieldValue = $field.val() || $field.prop('value') || $field.attr('value') || '0';
                cy.log(`Retrieved field value: ${fieldValue}`);

                // Convert to number with validation
                const numericValue = parseInt(fieldValue, 10);
                if (isNaN(numericValue)) {
                    throw new Error(`Invalid numeric value: "${fieldValue}"`);
                }

                const newValue = numericValue + 1;

                // Log the values for debugging
                cy.log(`Original value: ${fieldValue}`);

                // Store in our persistent variable
                storedIncrementedValue = newValue;

                // Log for debugging
                cy.log(`Stored incremented value: ${storedIncrementedValue}`);
            });
        })
})

describe('MoveXpert', () => {

    it('NAVIGATION TO Processing > MoveXpert', () => {
    //MoveXpert
    cy.get('#Item_COR16').click()
    cy.get('#Item_COR19').click()

    })

    it('Verify the presence of form Header', () => {
        cy.contains('#formcontainer > h1 > span:nth-child(2)','MoveXpert').should('be.visible')

    })

    it('Select Location', () => {
        cy.get('#ddlLocations').select('Jackson Test')
    })

    it('Select From Pen', () => {
        cy.get('#fromPenGridView')
        .should('be.visible')
        .within(() => {
            cy.get('td[aria-describedby="fromPenGridView_P.PEN_NBR"]')
            .contains('0001').should('be.visible').click();
            
        })
    })

    it('Select Animal to transfer', () => {
        cy.get('#animalGridView')
        .should('be.visible')
        .within(() => {
            cy.get('tr[role="row"]') // Select all rows within the table body
                .eq(1).click() // Get the *first* row
                
        })
            
        })
   
        it('Select TO Pen TYPE', () => {
            cy.get('#rdbToOtheHome').click()
            
        })

    it('Select TO Pen', () => {
        cy.get('#toPenGridView')
        .should('be.visible')
        .within(() => {
            cy.get('td[aria-describedby="toPenGridView_PEN_NBR"]')
            .contains('0002').should('be.visible').click();
            
        })
    })

    it('Move the Animal', () => {
        cy.wait(2000)
        cy.get('#btnMove').click()
        cy.get('#popup_message').should('contain', 'Animal(s) moved successfully')
        cy.wait(2000)
        cy.get('#popup_ok').click()

    })

})

describe('Verify Animal is moved', () => {

    it('NAVIGATION TO Processing > Pen Details', () => {
    //Pen Details
    cy.get('#Item_COR16').click()
    cy.get('#Item_COR20').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Pen Details').should('be.visible')

    })

    it('Verify Pen Details head count value increases', () => {
        cy.get('#txtPenNumber').focus().clear().type('0002{downarrow}{enter}')
        cy.wait(3000)
        //Pen Details
        cy.get('#txtInPen')
        .should('exist')
            .and('be.visible')
            .invoke('val')
            .then((actualValue) => {
                // Convert values to numbers for comparison
                const actual = parseInt(actualValue, 10);

                // Log values for debugging
                cy.log(`Expected value: ${storedIncrementedValue}`);
                cy.log(`Actual value: ${actual}`);

                // Assert that the values match
                expect(actual).to.equal(storedIncrementedValue);
            });
    
    })
})