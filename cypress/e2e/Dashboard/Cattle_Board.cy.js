import { login } from '../../support/function.js';

let storedIncrementedValue;
let storedIncrementedValue2;
let PmwValue;
// REMINDER : Before running tests, make sure the animal is available in the system and the animal is not treated, realized or dead.
// Change the animal numbers manually for all three treat, realized or dead.

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        login();
    })
})

describe('Verify the PULLS field is displaying correct data after treating an animal', () => {

    it('NAVIGATION TO DASHBOARD > Cattle Board', () => {
        //Cattle Board
        cy.get('#Item_JHS1').click()
        cy.get('#Item_JHS2').click()


    })
    it('Verify the presence of Cattle Board form Header', () => {
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Cattle Board').should('be.visible')
    })


    it('Get the Today Pulls value and store it into a variable', () => {
        // Wait for the field to be populated
        cy.wait(2000); // Give time for any dynamic loading

        // First verify the field exists and its state
        cy.get('#txtPulls')
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

    it('Get the Current Market week value and store it into a variable', () => {

        //GEt value for Current Market week
        cy.get('#txtPullsMW')
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
                storedIncrementedValue2 = newValue;

                // Log for debugging
                cy.log(`Stored incremented value: ${storedIncrementedValue2}`);
            });
    })

    it('Get the Previous Market week value and store it into a variable', () => {
        //Get value for PREVIOUS Market week
        cy.get('#txtPullsPMW')
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

                PmwValue = numericValue;

                // Log for debugging
                cy.log(`Stored incremented value: ${PmwValue}`);
            });

    });


    it('NAVIGATION TO HEALTH > Treat/Dead/Realize Treat An animal', () => {
        //Treat/Dead/Realize
        cy.get('#Item_JHS31').click()
        cy.get('#lnkAnimalTreatment').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Treat/Dead/Realize').should('be.visible')
    })

    it('Select animal and verify if selected', () => {
        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('1212-15')
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
        cy.get('#ddlTreatmentPerson').should('be.visible').select('Jeremy Fox')
        cy.get('#rbHospital').click()
        cy.get('#ddlToPen').should('be.visible').select('H100')
    });

    it('Save animal', () => {
        cy.get('#bttnTreatmentSave').should('be.visible').click()
        cy.get('#popup_message > .SucessMsg').should('contain', 'Animal Treatment has been saved successfully')
        cy.get('#popup_ok').click()
    })

    it('Navigate to  cattle board', () => {
        //Cattle Board
        cy.get('#Item_JHS1').click()
        cy.get('#Item_JHS2').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Cattle Board').should('be.visible')
    })

    it('Verify After treating an Animal Today pulls value increases', () => {
        cy.wait(2000);

        cy.get('#txtPulls')
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

    it('Verify After treating an Animal Curret Market week value increases', () => {
        cy.get('#txtPullsMW')
            .should('exist')
            .and('be.visible')
            .invoke('val')
            .then((actualValue) => {
                // Convert values to numbers for comparison
                const actual = parseInt(actualValue, 10);

                // Log values for debugging
                cy.log(`Expected value: ${storedIncrementedValue2}`);
                cy.log(`Actual value: ${actual}`);

                // Assert that the values match
                expect(actual).to.equal(storedIncrementedValue2);
            });
    })

    it('Verify After treating an Animal Previous Market week value stays same', () => {

        cy.get('#txtPullsPMW')
            .should('exist')
            .and('be.visible')
            .invoke('val')
            .then((actualValue) => {
                // Convert values to numbers for comparison
                const actual = parseInt(actualValue, 10);

                // Log values for debugging
                cy.log(`Expected value: ${PmwValue}`);
                cy.log(`Actual value: ${actual}`);

                // Assert that the values match
                expect(actual).to.equal(PmwValue);
            });
    });
})

describe('Verify the REALIZED field is displaying correct data after realizing an animal', () => {



    it('Get the Today Pulls value and store it into a variable', () => {
        cy.reload();
        // Wait for the field to be populated
        cy.wait(2000); // Give time for any dynamic loading

        // First verify the field exists and its state
        cy.get('#txtReal')
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


    });

    it('Get the Current Market week value and store it into a variable', () => {

        //GEt value for Current Market week
        cy.get('#txtRealMW')
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
                storedIncrementedValue2 = newValue;

                // Log for debugging
                cy.log(`Stored incremented value: ${storedIncrementedValue2}`);
            });
    })

    it('Get the Previous Market week value and store it into a variable', () => {
        //Get value for PREVIOUS Market week
        cy.get('#txtRealPMW')
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

                PmwValue = numericValue;

                // Log for debugging
                cy.log(`Stored incremented value: ${PmwValue}`);
            });

    });



    it('NAVIGATION TO HEALTH > Treat/Dead/Realize', () => {
        //Treat/Dead/Realize
        cy.get('#Item_JHS31').click()
        cy.get('#lnkAnimalTreatment').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Treat/Dead/Realize').should('be.visible')
    })

    it('Select animal and verify Selected', () => {

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('SR033')
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

    it('Save animal and verify animal is Realized', () => {
        cy.get('#bttnRealizeSave').should('be.visible').click()
        cy.get('#popup_message > .SucessMsg').should('contain', 'Animal realizer saved successfully')
        cy.get('#popup_ok').click()
    })

    it('Navigate to  cattle board', () => {
        //Cattle Board
        cy.get('#Item_JHS1').click()
        cy.get('#Item_JHS2').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Cattle Board').should('be.visible')
    })

    it('Verify After realizing an Animal Realized value increases', () => {
        cy.wait(2000);

        cy.get('#txtReal')
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
    });

    it('Verify After Realizing an Animal Curret Market week value increases', () => {
        cy.get('#txtRealMW')
            .should('exist')
            .and('be.visible')
            .invoke('val')
            .then((actualValue) => {
                // Convert values to numbers for comparison
                const actual = parseInt(actualValue, 10);

                // Log values for debugging
                cy.log(`Expected value: ${storedIncrementedValue2}`);
                cy.log(`Actual value: ${actual}`);

                // Assert that the values match
                expect(actual).to.equal(storedIncrementedValue2);
            });
    })

    it('Verify After Realizing an Animal Previous Market week value stays same', () => {

        cy.get('#txtRealPMW')
            .should('exist')
            .and('be.visible')
            .invoke('val')
            .then((actualValue) => {
                // Convert values to numbers for comparison
                const actual = parseInt(actualValue, 10);

                // Log values for debugging
                cy.log(`Expected value: ${PmwValue}`);
                cy.log(`Actual value: ${actual}`);

                // Assert that the values match
                expect(actual).to.equal(PmwValue);
            });
    });
})

describe('Verify the DEAD field is displaying correct data after an animal is Dead', () => {



    it('Get the Today Dead value and store it into a variable', () => {
        cy.reload();
        // Wait for the field to be populated
        cy.wait(2000); // Give time for any dynamic loading

        // First verify the field exists and its state
        cy.get('#txtDead')
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
    });

    it('Get the Current Market week value and store it into a variable', () => {

        //GEt value for Current Market week
        cy.get('#txtDeadMW')
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
                storedIncrementedValue2 = newValue;

                // Log for debugging
                cy.log(`Stored incremented value: ${storedIncrementedValue2}`);
            });
    })

    it('Get the Previous Market week value and store it into a variable', () => {
        //Get value for PREVIOUS Market week
        cy.get('#txtDeadPMW')
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

                PmwValue = numericValue;

                // Log for debugging
                cy.log(`Stored incremented value: ${PmwValue}`);
            });

    });

    it('NAVIGATION TO HEALTH > Treat/Dead/Realize', () => {
        //Treat/Dead/Realize
        cy.get('#Item_JHS31').click()
        cy.get('#lnkAnimalTreatment').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Treat/Dead/Realize').should('be.visible')
    })

    it('Select animal and verify Selected', () => {
        cy.reload()
        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('SR023')
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

    it('Save animal and verify animal is dead', () => {
        cy.get('#bttnDeadSave').should('be.visible').click()
        cy.get('#popup_message > .SucessMsg').should('contain', 'Animal dead saved successfully')
        cy.get('#popup_ok').click()
    })

    it('Navigate to  cattle board', () => {
        //Cattle Board
        cy.get('#Item_JHS1').click()
        cy.get('#Item_JHS2').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Cattle Board').should('be.visible')
    })

    it('Verify After an Animal is dead the Dead value increases', () => {
        cy.wait(2000);

        cy.get('#txtDead')
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
    });

    it('Verify After an Animal is Dead Curret Market week value increases', () => {
        cy.get('#txtDeadMW')
            .should('exist')
            .and('be.visible')
            .invoke('val')
            .then((actualValue) => {
                // Convert values to numbers for comparison
                const actual = parseInt(actualValue, 10);

                // Log values for debugging
                cy.log(`Expected value: ${storedIncrementedValue2}`);
                cy.log(`Actual value: ${actual}`);

                // Assert that the values match
                expect(actual).to.equal(storedIncrementedValue2);
            });
    })

    it('Verify After an Animal is Dead Previous Market week value stays same', () => {

        cy.get('#txtDeadPMW')
            .should('exist')
            .and('be.visible')
            .invoke('val')
            .then((actualValue) => {
                // Convert values to numbers for comparison
                const actual = parseInt(actualValue, 10);

                // Log values for debugging
                cy.log(`Expected value: ${PmwValue}`);
                cy.log(`Actual value: ${actual}`);

                // Assert that the values match
                expect(actual).to.equal(PmwValue);
            });
    });
})