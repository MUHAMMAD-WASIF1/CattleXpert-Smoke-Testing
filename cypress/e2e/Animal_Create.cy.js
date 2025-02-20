import { getRandomString, login } from '../support/function.js';

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

  it('LOGIN TO CATTLEXPERT WEBSITE', () => {
    // LOGIN
    login();
  })
})

describe('Verify all UI elements of "Animal Create" are visible and interactable', () => {

  it('NAVIGATION TO HEALTH > Animal Create', () => {
    //Animal Create
    cy.get('#Item_JHS31').click()
    cy.get('#Item_JHS32').click()
  })

  it('Header Assertion ', () => {
    // Header
    cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Animal Create').should('be.visible')
  })

  it('Assertion Of All Dropdowns ', () => {
    // Dropdowns
    cy.get('.ddlBuywpr > .custom-combobox').should('be.visible'); // Buy dropdown
    cy.get('.ddlLot1wpr > .custom-combobox').should('be.visible'); // Lot dropdown
    cy.get('.ddlPen1wpr > .custom-combobox').should('be.visible'); // Pen dropdown
    cy.get('.ddlGenderwpr > .custom-combobox').should('be.visible'); // Gender dropdown
    cy.get('#ddlOrigin1').should('be.visible'); // Origin dropdown
    cy.get('#ddlRanch').should('be.visible'); // Ranch dropdown
    cy.get('#ddlBreed').should('be.visible'); // Breed dropdown
    cy.get('#ddlAuction').should('be.visible'); // Auction dropdown
  })

  it('Assertion Of All Checboxes ', () => {
    // Checkbox
    cy.get('#chkUsePrefix').should('be.visible').should('be.checked'); // Use Prefix checkbox
    cy.get('#chkIndividualAnimal').should('be.visible').should('not.be.checked'); // Individual Animal checkbox 
    cy.get('#chkIndividualAnimal').check().should('be.checked'); // Individual Animal checkbox, Check it

  })

  it('Assertion Of All Input Fields ', () => {
    // Input Fields
    cy.get('#txtUsePrefix').should('be.visible'); // Prefix input
    cy.get('#txtBeginWith').should('be.visible'); // Begin with input
    cy.get('#txtAnimalRcrds').should('be.visible'); // No. of Animal Records
    cy.get('#txtAnimalNo').should('be.visible'); // Animal Number
    cy.get('#txtCowCalfId').should('be.visible'); // Cow Calf ID
    cy.get('#txtVisualTagId').should('be.visible'); // Visual Tag ID
    cy.get('#txtSetupDate').should('be.visible'); // Setup Date
    cy.get('#txtWeight').should('be.visible'); // Weight
  })

  it('Assertion Of All Buttons ', () => {
    // Buttons
    cy.get('#btnCreate').should('be.visible').and('have.value', 'Create Animal Record'); // Create Button
    cy.get('#btnCancel').should('be.visible').and('have.value', 'Clear'); // Clear Button
  })

  it('Assertion Of All Required field indicators ', () => {
    // Required field indicators
    cy.contains('Buy:*').should('have.css', 'color', 'rgb(186, 14, 12)'); // Red color for required field
    cy.contains('Lot:*').should('have.css', 'color', 'rgb(186, 14, 12)');
    cy.contains('Pen:*').should('have.css', 'color', 'rgb(186, 14, 12)');
    cy.contains('Gender:*').should('have.css', 'color', 'rgb(186, 14, 12)');
    cy.contains('Animal # (15):*').should('have.css', 'color', 'rgb(186, 14, 12)');
    cy.contains('Weight:*').should('have.css', 'color', 'rgb(186, 14, 12)');
  })

  it('Assertion Of Footer Information ', () => {
    // Footer Information
    cy.contains('Items in RED * are required information').should('be.visible');
  })

})

describe('Multiple Animal Records Creation And Verification)', () => {

  it('Creating Multiple Animals Records', () => {

    // Select "J101688" for the "Buy" field.
    cy.get('#txtBuy')
      .focus()
      .type('J101688{downarrow}{enter}')
    cy.wait(2000)

    // Uncover next element
    cy.get('#formcontainer > .curvetop').click()

    // Select "WASAUTO" for the "Lot" field.
    cy.get('#txtLot1')
      .click()
      .type('WASAUTO{downarrow}{enter}');

    // Uncover next element
    cy.get('#formcontainer > .curvetop').click()

    // Select "V002" for the "Pen" field.
    cy.get('#txtPen1')
      .click()
      .type('V002{downarrow}{enter}')


    //   // Select "Owner" for the "Buyer" field. No data in dropdown
    //   cy.get(selectors.buyerField)
    //     .should('be.visible')
    //     .select('Owner');

    //   // Select "Ranch" for the "Auction" field. No data in dropdown
    //   cy.get(selectors.auctionField)
    //     .should('be.visible')
    //     .select('Ranch');

    // Select "Feedlot" for the "Origin" field.
    cy.get('#ddlOrigin1')
      .should('be.visible')
      .select('JHS1');

    // Select "ID Ranch" for the "Ranch" field (optional).
    cy.get('#ddlRanch')
      .should('be.visible')
      .select('JHS1');

    // Select "Simmental" for the "Breed" field.
    cy.get('#ddlBreed')
      .should('be.visible')
      .select('JHS1');

    // Check the "Use Prefix" checkbox.
    cy.get('#chkUsePrefix')
      .should('exist')
      .check().should('be.checked');


    // Generate a random String
    const randomString = getRandomString(2);
    // Log the random String 
    cy.log(`Random String: ${randomString}`);

    cy.get('#txtUsePrefix')
      .should('be.visible').click()
      .type(randomString + '-WASAUT-');

    // Enter text in the "Begin With" field.
    cy.get('#txtBeginWith')
      .should('be.visible').click()
      .clear()
      .type('01');

    // Enter "10" in the "No. of Animal Records to Create" field.
    cy.get('#txtAnimalRcrds')
      .should('be.visible').click()
      .clear()
      .type('10');

    // Click the "Create Animal Record" button.
    cy.get('#btnCreate')
      .should('be.visible')
      .click();
  })

  it('Verify Multiple animal records are created', () => {

    // Verify that the specified number of animal records are created successfully.
    cy.get('#popup_message > .productGridView > #gbox_productGridView > #gview_productGridView > .ui-jqgrid-bdiv > [style="position:relative;"] > #productGridView')
      .should('be.visible')
      .within(() => {
        // Each record has a common class name ".Green"
        cy.get('.Green').should('have.length', 10);

        // Verify that each record displays status ANIMAL CREATED.
        cy.get('.Green').each(($record) => {
          cy.wrap($record).should('have.text', 'ANIMAL CREATED');
          
        });

      });
      cy.wait(2000)
  });
});

describe('INDIVIDUAL Animal Record Creation And Verification', () => {

  it('Creating INDIVIDUAL Animals Record', () => {

    // Reload the page to reset state
    cy.reload();

    // Select "J101688" for the "Buy" field.
    cy.get('#txtBuy')
      .focus()
      .type('J101688{downarrow}{enter}')
    cy.wait(2000)

    // Uncover next element
    cy.get('#formcontainer > .curvetop').click()

    // Select "WASAUTO" for the "Lot" field.
    cy.get('#txtLot1')
      .click()
      .type('WASAUTO{downarrow}{enter}');

    // Uncover next element
    cy.get('#formcontainer > .curvetop').click()

    // Select "V002" for the "Pen" field.
    cy.get('#txtPen1')
      .click()
      .type('V002{downarrow}{enter}')


    //   // Select "Owner" for the "Buyer" field. No data in dropdown
    //   cy.get(selectors.buyerField)
    //     .should('be.visible')
    //     .select('Owner');

    //   // Select "Ranch" for the "Auction" field. No data in dropdown
    //   cy.get(selectors.auctionField)
    //     .should('be.visible')
    //     .select('Ranch');

    // Select "Feedlot" for the "Origin" field.
    cy.get('#ddlOrigin1')
      .should('be.visible')
      .select('JHS1');

    // Select "ID Ranch" for the "Ranch" field (optional).
    cy.get('#ddlRanch')
      .should('be.visible')
      .select('JHS1');

    // Select "Simmental" for the "Breed" field.
    cy.get('#ddlBreed')
      .should('be.visible')
      .select('JHS1');

    // Check the "individual animal" checkbox.
    cy.get('#chkIndividualAnimal')
      .should('exist')
      .check().should('be.checked');
    cy.get('#secIndividualAnimal > .inlblk').should('be.visible')

      // Generate a random string
      const randomString = getRandomString(2);
      // Log the random string
      cy.log(`Random String: ${randomString}`);

    cy.get('#txtAnimalNo')
      .should('be.visible').click()
      .type('WASAUT-' + randomString);

    cy.get('#txtVisualTagId')
      .should('be.visible').click()
      .type('vWASAUT-' + randomString);

    cy.get('#txtWeight')
      .should('be.visible').click().clear()
      .type('500');

    cy.get('#txtCowCalfId')
      .should('be.visible').click()
      .type('cWASAUT-' + randomString);

    // Click the "Create Animal Record" button.
    cy.get('#btnCreate')
      .should('be.visible')
      .click();

  })

  it('Verify INDIVIDUAL animal record is created', () => {

    // Verify that the specified number of animal records are created successfully.
    cy.get('#popup_message > .productGridView > #gbox_productGridView > #gview_productGridView > .ui-jqgrid-bdiv > [style="position:relative;"] > #productGridView')
      .should('be.visible')
      .within(() => {
        // Each record has a common class name ".ui-widget-content jqgrow ui-row-ltr"
        cy.get('.Green').should('have.length', 1);

        // Verify that each record displays status ANIMAL CREATED.
        cy.get('.Green').should('have.text', 'ANIMAL CREATED');
      });

  });
});




