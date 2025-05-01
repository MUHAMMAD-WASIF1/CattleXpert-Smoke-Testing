import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

describe('Verify Shiplist summary data', () => {
  let nav;
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Verify data ship list Report', () => {
    login_headstrom();

    // Navigate to "Cattle ship list" report
    cy.get(nav.Reports).click();//navigate to reports
    cy.get("#Item_JHS254").click();//click on Cattle Reports
    cy.get("#Item_JHS266").click();//click on Cattle Ship List


   //select the start date and end date
   cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue').type("04/01/2025");
   cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue').type("04/18/2025");
   //select the owner from the owner dropdown
   cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl07_ddValue').select("10");
   
    // Click on the view report button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();

    // Wait for report to load (adjust as needed)
    cy.wait(2000);

// Assert table headers
cy.contains('Ship Lot').should('exist');
cy.contains('Ship Date').should('exist');
cy.contains('Pen Num').should('exist');
cy.contains('Gender').should('exist');
cy.contains(/Head\s*Shipped/).should('exist');
cy.contains(/Pay\s*Wght/).should('exist');
cy.contains(/Avg Ship\s*Wght/).should('exist');
cy.contains('Gross').should('exist');
cy.contains('Beef Cncl').should('exist');
cy.contains('Fght').should('exist');
cy.contains('Net').should('exist');
cy.contains(/Buy\s*Num/).should('exist');
cy.contains('Cust / Loc').should('exist');
cy.contains('BAL24-1').should('exist');
cy.contains('Realizer Sales').should('exist');
  
//stored expected values
const expectedData ={
  Owner: 'BAL',
  Gender: 'ST',
  Pen_Num: '0017',
};

//Navigate to Processing > Lot Detail
cy.get('#Item_JHS16').click(); 
cy.get('#Item_JHS18').click(); // Click on Lot Detail
cy.wait(2000); // Wait for the page to load

//Type the Lot Number in the Lot Number field
cy.get('#txtEditLotNumber').type("BAL24-1").type('{enter}');

// Wait for the Lot Detail page to load
cy.wait(2000);

//Verify the values from summary tab
cy.contains(expectedData.Owner).should('exist');
cy.contains(expectedData.Gender).should('exist');
cy.contains(expectedData.Pen_Num).should('exist');
  
      
      });
    }) 
