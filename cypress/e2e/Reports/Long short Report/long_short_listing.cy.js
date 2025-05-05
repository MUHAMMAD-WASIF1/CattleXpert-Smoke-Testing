import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';
let nav;

// Load navigation fixture before each test
beforeEach(() => {
  cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
    nav = headstrom_navigation;
  });
});
describe('verify the long short listing report', () => {
 

  it('verify the long short listing report', () => {
    // Log in to the application
    login_headstrom();

    // Navigate to the "Reports" section
    cy.get(nav.Reports).click();
    cy.get("#Item_JHS280").click(); // Click on "Long Short Report"
    cy.get("#Item_JHS281").click(); // Click on "Long Short Listing Report"
    cy.wait(2000); // Wait for the report to load
    // Set the date range for the report    
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue').type('4/17/2025'); // Start Date
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue').type('4/18/2025'); // End Date
    // Select "All" for location dropdown
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl07_ddValue').select('1'); // Location
    // click on the view report button  
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
    cy.wait(2000); // Wait for the report to load

    // Validate key column headers in the report
    cy.contains(/Long\s*\/\s*Short\s*Type/).should('exist');
    cy.contains(/Process[\s_]Date/).should('exist');
    cy.contains(/Lot[\s_]Number/).should('exist');
    cy.contains(/Lot[\s_]I/).should('exist');
    cy.contains('Gender').should('exist');
    cy.contains('Head Count').should('exist');
    cy.contains('Pay Weight').should('exist');
    cy.contains(/Price[\s_]Per[\s_]CWT/).should('exist');
    cy.contains(/Net\s*Amount/).should('exist');
    cy.wait(2000); 

    // Expected values to validate

    const expectedData = {
      Long_Short_Type: 'Long',
      //Process_Date: '4/17/2025',
      Lot_Number: 'ANH01',
      Gender: 'MX',
      Price_Per_CWT: '250.00',
      Head_Count: '20',
      Pay_Weight: '12,000',
    }

    //Navigate to the sale Module
    cy.get(nav.Sales).click(); // Click on Sale Module
    cy.get(nav.Cattle_Sales).click(); // Click on cattle Sale
    cy.wait(2000); // sales screen load time

    // enter the lot number in the search box
    cy.get('#txtEditLotNumber').type('ANH01').type('{enter}'); // Type Lot Number and press Enter
    cy.wait(2000); // Wait for the page to load

    //click on long/short and Holdovers
    cy.get('#LotPenAssignment > a').click(); // Click on Long/Short and Holdovers
    cy.wait(2000); // Wait for the page to load

    //Verify the values from summary tab
   cy.contains(expectedData.Long_Short_Type).should('exist');
   cy.contains(expectedData.Lot_Number).should('exist');
   cy.contains(expectedData.Gender).should('exist');
   cy.contains(expectedData.Price_Per_CWT).should('exist');
   cy.contains(expectedData.Head_Count).should('exist');
   cy.contains(expectedData.Pay_Weight).should('exist');












  })
})