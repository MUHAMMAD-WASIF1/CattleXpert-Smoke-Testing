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

    // Navigate to "Feeding Load" report
    cy.get(nav.Reports).click(); // Navigate to reports
    cy.get("#Item_JHS324").click(); // Click on Feeding Reports
    cy.get("#Item_JHS332").click(); // Click on Feeding Loads
    
  //Select the call Number
  cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue').type("01");
//select the Truck Type:	
  cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl07_ddValue').select("All");
// Select the option "Feed Call" by its value
cy.get('select#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl09_ddValue')
.select('1', { force: true });
//click on the view report button       
cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
// Wait for report to load (adjust as needed)
cy.wait(2000);
// Assert table headers
cy.contains('Commodity Load Amounts').should('exist');
cy.contains('Commodity').should('exist');
cy.contains('Load Amount').should('exist');
cy.contains('% of Ration').should('exist');
cy.contains('Scale Weight').should('exist');


//stored expected values
const expectedData ={
    Owner: 'BAL',
    Gender: 'ST',
    Pen_Num: '0017',
  };
  

  });
})