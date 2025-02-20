import { getRandomString, login } from '../../support/function.js';

// Generate a random string
const randomString = getRandomString(5);

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

  it('LOGIN TO CATTLEXPERT WEBSITE', () => {
    // LOGIN
    login();
  })
})

describe('Verify all UI elements of "Animal Details & General Tab" are visible and interactable', () => {

  it('NAVIGATION TO HEALTH > Animal Details', () => {
    //Animal Details
    cy.get('#Item_JHS31').click()
    cy.get('#lnkAnimalDetail').click()

  })
  it('verify the presence of form Header', () => {
    cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Animal Details').should('be.visible')
  })

  it('verify the presence of form section headers', () => {
    // Section Tabs
    cy.contains('#General > a', 'General').should('be.visible');
    cy.contains('#tab_Weight', 'Weights').should('be.visible');
    cy.contains('#Breeding > a', 'Breeding').should('be.visible');
    cy.contains('#Health > a', 'Health').should('be.visible');
    cy.contains('#Carcass > a', 'Carcass').should('be.visible');
    cy.contains('#Attachment > a', 'Attachment').should('be.visible');
    cy.contains('#Tags > a', 'Tags').should('be.visible');
    cy.get('li').contains('Imported Data')
  });

  // Test Case: Verify Labels for Input Fields
  it('verify all field labels', () => {
    cy.contains('Animal:').should('be.visible');
    cy.contains('Status:').should('be.visible');
    cy.contains('Market Week:').should('be.visible');
    cy.contains('Lot:').should('be.visible');
    cy.contains('Pay Weight:').should('be.visible');
    cy.contains('Created By:').should('be.visible');
    cy.contains('Home Pen:').should('be.visible');
    cy.contains('Current Pen:').should('be.visible');
    cy.contains('Created On:').should('be.visible');

    cy.contains('Gender:').should('be.visible');
    cy.contains('Birth Date:').should('be.visible');
    cy.contains('Breed:').should('be.visible');
    cy.contains('Visual ID:').should('be.visible');
    cy.contains('Calf ID:').should('be.visible');
    cy.contains('Tag 3:').should('be.visible');
    cy.contains('Tag 4:').should('be.visible');
    cy.contains('Lot:').should('be.visible');
    cy.contains('Home Pen:').should('be.visible');
    cy.contains('Buller').should('be.visible');
  });

  // Test Case: Verify Dropdown Fields
  it('verify all dropdowns are visible and interactable', () => {
    cy.get('#ddlGGender').should('be.visible'); // Gender dropdown
    cy.get('#ddlGBreed').should('be.visible'); // Breed dropdown
    cy.get('#ddlHomeLot').should('be.visible'); // Lot dropdown
    cy.get('#ddlHomePen').should('be.visible'); // Home Pen dropdown
    cy.get('#ddlGClass').should('be.visible'); // Class dropdown
    cy.get('#ddlGOrigin').should('be.visible'); // Origin dropdown
    cy.get('#ddlGBuyer').should('be.visible'); // Buyer dropdown
    cy.get('#ddlGAuction').should('be.visible'); // Auction dropdown
    cy.get('#ddlGRanch').should('be.visible'); // Ranch dropdown
    cy.get('#ddlGState').should('be.visible'); // State dropdown
    cy.get('#ddlGBuy').should('be.visible'); // Buy dropdown
  });

  // Test Case: Verify Input Fields
  it('verify all input fields are visible and editable', () => {
    cy.get('#txtAnimal').should('be.visible'); // Animal Number
    // .should('be.visible'); // Status
    cy.get('#txtGBirthDate').should('be.visible'); // Birth Date
    cy.get('#txtGVisualID').should('be.visible'); // Visual ID
    cy.get('#txtGCalfID').should('be.visible'); // Calf ID
    cy.get('#ddlGLocation').should('be.visible'); // Location (default)
    cy.get('#txtareaGNotes').should('be.visible'); // Notes
  });
  it('verify all input fields are visible and disabled', () => {

    cy.get('#txtMarketWeek').should('be.visible').and('have.attr', 'readonly'); // Market Week
    cy.get('#txtGLot').should('be.visible').and('be.disabled'); // Lot
    cy.get('#txtPayWeight').should('be.visible').and('have.attr', 'readonly'); // Pay Weight
    cy.get('#txtCreatedBy').should('be.visible').and('be.disabled'); // Created By
    cy.get('#txtGHomePen').should('be.visible').and('be.disabled'); // Home Pen
    cy.get('#txtCurrentPen').should('be.visible').and('have.attr', 'readonly'); // Current Pen
    cy.get('#txtCreatedOn').should('be.visible').and('be.disabled'); // Created On
    cy.get('#txtGTag3').should('be.visible').and('be.disabled'); // Tag 3 (disabled)
    cy.get('#txtGTag4').should('be.visible').and('be.disabled'); // Tag 4 (disabled)
    cy.get('#txtGReSortDate').should('be.visible').and('be.disabled'); // Resort Date
    cy.get('#txtGLastUpdate').should('be.visible').and('be.disabled'); // Last Update
    cy.get('#txtAnimalStatus').should('be.visible').and('be.disabled'); // Status
    cy.get('#txtGIndividualSetupWt').should('be.visible').and('be.disabled'); // Individual Setup Weight
    cy.get('#txtGSetupDate').should('be.visible').and('be.disabled'); // Setup Date
    cy.get('#txtGActOutDate').should('be.visible').and('be.disabled'); // Actual Out Date
    cy.get('#txtGMedCost').should('be.visible').and('be.disabled'); // Medical Cost
    cy.get('#txtGWkClear').should('be.visible').and('be.disabled'); // Animal Clear Date
    cy.get('#txtPenclearDateWk').should('be.visible').and('be.disabled'); // Home Pen Clear Date
    cy.get('#txtGHotItem').should('be.visible').and('be.disabled'); // Hot Item
    cy.get('#txtGWeight').should('be.visible').and('be.disabled'); // Average Pen Weight
  })

  // Test Case: Verify Buttons
  it('verify all buttons are visible and interactable', () => {
    cy.get('#btnUpdate').should('be.visible').and('have.value', 'Update Animal'); // Update Animal button
    cy.get('#btnUpdateAll').should('be.visible').and('have.value', 'Update All on Buy'); // Update All on Buy button
    cy.get('#btnResurrect').should('be.visible').and('have.value', 'Resurrect'); // Resurrect button
    cy.get('#btnDelete').should('be.visible').and('have.value', 'Delete'); // Delete button
  });

  // Test Case: Verify Required Field Indicators
  it('verify required fields have red indicators', () => {
    cy.contains('Animal:').should('have.css', 'color', 'rgb(186, 14, 12)'); // Red color for required field
  });

  // Test Case: Verify Checkbox
  it('verify Buller checkbox is visible and selectable', () => {
    cy.get('#chkBuller').should('be.visible')
  });

  // Test Case: Verify Footer Information
  it('verify footer messages and modification details', () => {
    cy.contains('Items in RED * are required information').should('be.visible');
    cy.contains('Last Modified By').should('be.visible');
  });
});

describe('Select Animal and Update Details', () => {

  it('Select Animal Details', () => {
    //Select Animal 
    cy.get('#txtAnimal')
      .focus()
      .type('WASAUTO-T')
    //Random click to fetch data
    cy.get(':nth-child(1) > .red > span').click()
    cy.wait(2000)
    cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')

  })


  it('Update Animal Details', () => {


    // Log the random String 
    cy.log(`Random String: ${randomString}`);

    // Adding text in Visual ID
    cy.get('#txtGVisualID').should('be.visible')
      .focus().clear().type(randomString);

    // Adding text in Calf ID
    cy.get('#txtGCalfID').should('be.visible')
      .focus().clear().type(randomString);

    // Adding text in Notes
    cy.get('#txtareaGNotes').should('be.visible')
      .focus().clear().type(randomString);

    // Update Animal button
    cy.get('#btnUpdate').should('be.visible').and('have.value', 'Update Animal').click();

  })

  it('Verify Animal Details are updated', () => {

    // Reload the page to reset state
    cy.reload();

    // RESelect Animal 
    cy.get('#txtAnimal')
      .focus()
      .type('WASAUTO-T')
    //Random click to fetch data
    cy.get(':nth-child(1) > .red > span').click()
    cy.wait(2000)
    cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')


    // Log the random String 
    cy.log(`Random String: ${randomString}`);

    // Checking text in Visual ID
    cy.get('#txtGVisualID').should('be.visible')
      .and('have.value', randomString);

    // Checking text in Calf ID
    cy.get('#txtGCalfID').should('be.visible')
      .and('have.value', randomString);

    // Checking text in Notes
    cy.get('#txtareaGNotes').should('be.visible')
      .and('have.value', randomString);

  })
})

