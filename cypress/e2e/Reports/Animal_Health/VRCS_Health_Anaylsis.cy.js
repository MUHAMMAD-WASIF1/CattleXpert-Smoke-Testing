import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("VRCS - Health Anaylsis Report", () => {
    // Step 1: Log in to the application
    login_headstrom();

    // Navigate to "VRCS - Health Anaylsis" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Animal_health).click();
    cy.get('#Item_JHS312').click(); // Click on VRCS - Health Anaylsis report
    cy.wait(2000); // Wait for report to load
    
    // Verify report title with proper selector
    cy.contains('Health Analysis').should('exist');


    // Verify report date with better timeout
   cy.contains('As of 5/13/2025').should('be.visible');

    // Verify table headers with improved structure
    const expectedHeaders = [
      'Lot Number',
      'Gender',
      'Breed',
      'Lot Start',
      'In',
      'Realizer',
      'Dead',
      'Current',
      'Morbidity',
      'Mortality',
      'Proc',
      'Med',
      'Total',
      'Days On'
    ];

    // Check headers with better waiting strategy
    expectedHeaders.forEach(header => {
  cy.contains(header).should('exist');
    });

    // Verify specific row data with improved assertions
    const rowData = {
      lotNumber: 'AEL-03',
      gender: 'Mixed',
      breed: 'Angus Cross',
      lotStart: '5/13/2025',
      in: '100',
      realizer: '0',
      dead: '0',
      current: '100',
      morbidity: '0.00%',
      proc: '9.79',
      med: '0.00',
      total: '9.79',
      daysOn: '0'
    };

    // Assert row data with better error handling
    cy.get('table')
      .contains('td', rowData.lotNumber)
      .closest('tr')
      .within(() => {
        Object.values(rowData).forEach(value => {
          cy.contains(value, { timeout: 5000 })
            .should('be.visible');
        });
      });

       // Step 10: Navigate to Lot Detail screen
    cy.get(nav.Processing).click();
    cy.get(nav.Lot_Detail).click();
    // Step 11: Enter the Lot Number and submit
    cy.get('#txtEditLotNumber')
      .type('AEL-03').type('{enter}');
      //wait for the Lot Detail page to load
    cy.wait(2000); // Wait for Lot Detail screen to load
    // Verify Lot Detail summary information
    cy.contains(rowData.lotNumber).should('exist');
    cy.contains(rowData.gender).should('exist');
    cy.contains(rowData.breed).should('exist');
    cy.contains(rowData.lotStart).should('exist');
    cy.contains(rowData.in).should('exist');
    
    //click on the Summary button
    cy.get('#btnSummary').click();
    // Verify the summary information
      cy.contains(rowData.realizer).should('exist');
      cy.contains(rowData.dead).should('exist');
      cy.contains(rowData.current).should('exist');
        cy.contains(rowData.med).should('exist');
        



  });
});