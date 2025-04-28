import { login_headstrom } from '../../../../support/funcation';
import 'cypress-xpath';

describe('Verify Summary by Animal Report Lot summary data', () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Verify data between Summary by owner Reports and Summary Detail', () => {
    login_headstrom();

    // Navigate to "Daily Feed Per Pen (Feed In)" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Animal_health).click();
    cy.get(nav.Lot_Health).click();
    cy.get("#Item_JHS303").click();
    
    // Select the lot status true
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_rbTrue').click();
    // Click on the view report button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
    

    cy.get('table').contains('Buyer', { matchCase: false }).should('be.visible'); // Scope the search to the table

    // Assert the first row 
    cy.contains('Wt').should('be.visible');
    cy.contains('Purch').should('be.visible'); 
    //cy.contains('Treat').should('be.visible');   
    cy.contains('%').should('be.visible');
    cy.contains('Pulls').should('be.visible');
    cy.contains('RePulls').should('be.visible');
    cy.contains('ReTrt').should('be.visible');
    //cy.contains('Dead').should('be.visible');
    cy.contains('Railer').should('be.visible');
    cy.contains('Buller').should('be.visible');

    //assert the H101475 Buyer Number
    cy.get('table').contains('H101475', { matchCase: false }).should('be.visible'); // Scope the search to the table
   //  // Extract data from "Lot Health Summary By Buyer - Animal" report
  // Extract Purch and Pulls values for H101475
//   let purchValue, pullsValue;

//   cy.get('table').contains('H101475').parent().within(() => {
//   cy.get('td').eq(2).invoke('text').then((text) => {
//     purchValue = text.trim(); // Store Purch value
//   });

//   cy.get('td').eq(4).invoke('text').then((text) => {
//     pullsValue = text.trim(); // Store Pulls value
//   });
//   });
  // Navigate to the next screen
  cy.get(nav.Procurement).click();
  cy.get(nav.Cattle_Receiving).click();

  cy.get('#cattleBuyChkAll').click(); // Select the checkbox for the first row
  cy.get('#ddlSearchCriteria').select('Buy No.');
  cy.get('#txtSearch').type('H101475'); // Enter the Buyer Number
  cy.get('#btnSearch').click(); // Click the search button
  cy.wait(2000); // Wait for the search results to load
 
  cy.get('[aria-describedby="productGridView_CATL_BUY_NBR"]').click(); // Click on the Buyer Number cell to open the details

  cy.get('#PenAssignment > .blue').click(); // Click on the Pen Assignment tab

  cy.get('table').contains('0004', { matchCase: false }).should('be.visible'); // Scope the search to the table
  cy.wait(2000); // Wait
  //Navigate to Animal
  cy.get('#btnAnimals').click(); // Click on the Animals tab
  //cy.wait(5000); // Wait for the Animals tab to load
  //cy.get('#secAnimalBtnPopup > .popupContent').scrollTo('bottom'); // Replace '.ui-jqgrid-bdiv' with the correct selector for the scrollable table container
  cy.get('#btnAnimalOK').should('exist').and('be.visible').click(); // Scroll to the OK button, ensure it's visible, and click it // Scroll to the OK button, ensure it's visible, and click it
  // Navigate to the lot detail screen
   // Step 2: Navigate to Processing > Pen Detail
   cy.get(nav.Processing).click(); 
   cy.get(nav.Pen_Details).click(); 
   // Step 3: Select the pen Number from the dropdown
   cy.get('.relative > .custom-combobox > .ui-button').click().type('0004'); // Open the dropdown
   cy.get('.ui-menu-item').contains('0004').click(); // Select '0004' from the dropdown
   
   cy.contains('Weight Class:', { matchCase: false }).should('exist').click({ force: true });
   cy.wait(3000); // Wait



    });
   })