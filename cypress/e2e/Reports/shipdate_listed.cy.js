import { login_headstrom } from '../../support/funcation';
import 'cypress-xpath';

describe('Verify Ship Date Listingsummary data', () => {
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
    cy.get("#Item_JHS289").click(); // Click on Shipdate Listing Report
    cy.wait(2000); // Wait for the page to load

    // Select the start date and end date
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue').type("10/1/2024");
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue').type("10/30/2024");
    
    //slect the location from the location dropdown
    //cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl07_ddValue').select("all_locations");
    //select the Grower from the Grower dropdown
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl09_ddValue').select("All");
  
    //select the Display Unsold
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl11_ddValue').select("True"); 
  
    //select true for page break down ship
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl13_rbTrue').click();

    // Click on the view report button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
  
    // Wait for report to load (adjust as needed)
    cy.wait(2000);

    // Assert table headers
   // Assert table headers
cy.contains('Ship Date Listing').should('exist');
cy.contains('Lot').should('exist');
cy.contains('Pen').should('exist');
cy.contains('Gender').should('exist');
cy.contains('DOF').should('exist');
cy.contains(/Est\s*DOF/).should('exist');
cy.contains(/Pay\s*Weight/).should('exist');
cy.contains(/Current\s*Weight/).should('exist');
cy.contains(/Tot\s*Head\s*Count/).should('exist');
cy.contains(/Hosp\s*Head/).should('exist');
cy.contains(/Net\s*Head/).should('exist');
cy.contains('MW').should('exist');
cy.contains('Owner').should('exist');
cy.contains('Customer').should('exist');
cy.contains(/Sold\s*Head/).should('exist');
cy.contains(/Head\s*Schd/).should('exist');
cy.contains(/Ship\s*Date/).should('exist');

//stored expected values
const expectedData ={
  Lot:'CCC24-2',
  Pen: '0032',
  Gender: 'Heifer',
  DOF: '205',
  pay_weight: '444',
  Tot_Head_Count: '106',
  Owner: 'Cottonwood Creek Cattle Co'
};

//Navigate to Processing > Lot Detail
cy.get('#Item_JHS16').click(); 
cy.get('#Item_JHS18').click(); // Click on Lot Detail
cy.wait(2000); // Wait for the page to load

//Type the Lot Number in the Lot Number field
cy.get('#txtEditLotNumber').type("CCC24-2").type('{enter}');

// Wait for the Lot Detail page to load
cy.wait(2000);

//Verify the values from summary tab
cy.contains(expectedData.Lot).should('exist');
cy.contains(expectedData.Pen).should('exist');
cy.contains(expectedData.Gender).should('exist');
cy.contains(expectedData.DOF).should('exist');
cy.contains(expectedData.pay_weight).should('exist');
cy.contains(expectedData.Tot_Head_Count).should('exist');
cy.contains(expectedData.Owner).should('exist');

  });
})