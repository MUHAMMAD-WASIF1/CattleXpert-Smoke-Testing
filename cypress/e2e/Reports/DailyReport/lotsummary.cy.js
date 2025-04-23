import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

describe('Verify Daily Report Lot summary data', () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Verify data between Lot summary Report and Summary Detail', () => {
    login_headstrom();

    // Navigate to "Daily Feed Per Pen (Feed In)" report
    cy.get(nav.Reports).click();
    cy.get("#Item_JHS206").click();
    cy.get("#Item_JHS208").click();

    //Select the Lot Number from the dropdown
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_ddValue').select("HCF24-2");
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
    // Wait for report to load (adjust as needed)
    cy.wait(2000);
    // Assert table headers
   it('should verify all column headers are present and in correct order', () => {
    const expectedHeaders = [
      'Lot Number',
      'Head Days',
      'A S Fed (lbs)',
      'DM Fed (lbs)',
      'Feed Cost',
      'Medical Cost',
      'Yard Cost',
      'Misc., Admin & Selling',
      'Proc & Reimplant',
      'Grain Adjust',
      'Total Cost'
    ];
});
// Wait for report to load (adjust as needed)
cy.wait(2000);
 // Step 3: Assert first row values for Lot HCF24-2
 const expectedRow = [
    'HCF24-2',
    '267,497',
    '6,077,058',
    '3,848,465',
    '$454204.90',
    '$26560.51',
    '$134413.65',
    '3,166.95',
    '58,220.02',
    '0.00',
    '$675666.03'
  ];

    // Step 2: Navigate to Processing > Lot Detail
    cy.get('#Item_JHS16').click(); 
    cy.get('#Item_JHS18').click(); 
  // Step 3: Select the Lot Number from the dropdown
  cy.get('#txtEditLotNumber')
  .type('HCF24-2').type('{enter}');
 // Types the value and presses Tab
 cy.get('#btnSummary').click();

 cy.get('#LotDetailSummary').within(() => { // Replace with actual modal container selector
    cy.contains('Head Days').next().should('contain', '267,497');
    cy.contains('Dry Matter Fed').next().should('contain', '3,848,465');
    cy.contains('As Fed').next().should('contain', '6,677,058');
    cy.contains('Feed Cost').next().should('contain', '$ 454,204.90');
    cy.contains('Medical Cost').next().should('contain', '$ 26,560.50');
    cy.contains('Yardage Cost').next().should('contain', '$ 134,413.65');
    cy.contains('Re-Processing Cost').next().should('contain', '$ 0.00');
    cy.contains('Miscellaneous Cost').next().should('contain', '$ 3,166.95');
    cy.contains('Processing Cost').next().should('contain', '$ 58,220.02');
    cy.contains('Interest Cost').next().should('contain', '$ 0.00');
    cy.contains('Administration Cost').next().should('contain', '$ 0.00');
    cy.contains('Selling Cost').next().should('contain', '$ 0.00');
    cy.contains('Guaranteed Cost').next().should('contain', '$ 0.00');
    cy.contains('Dead Income').next().should('contain', '$ 0.00');
  });
  
  });



  
  });

