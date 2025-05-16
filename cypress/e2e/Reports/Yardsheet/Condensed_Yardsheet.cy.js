import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  // Load navigation fixture before each test
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Verifying the Condense Yard Sheet Report", () => {
    // Step 1: Log in to the application
    login_headstrom();

    // Step 2: Navigate to the Condensed Yardsheet Report
    cy.get(nav.Reports).click();
    cy.get('#Item_JHS210').click(); // Open Reports submenu
    cy.get('#Item_JHS212').click(); // Click on "Condensed Yardsheet Report"
    cy.wait(2000); // Wait for the report UI to load

    // Step 3: Select the start date
    cy.get('.ui-datepicker-trigger').click();
    cy.get('.ui-datepicker-month').select('Apr'); // Select month
    cy.get('.ui-datepicker-calendar').contains('1').click(); // Select day

    // Step 4: Set report parameters
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl08_rbTrue').click(); // Select "True" for a parameter

    // Select "All" from first vendor dropdown
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_ddDropDownButton').click();
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_divDropDown_ctl00').click();

    // Select "All" from second vendor dropdown
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl10_ddDropDownButton').click();
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl10_divDropDown_ctl01').click();

    // Step 5: Click "View Report"
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
    cy.wait(2000); // Wait for report to load

    // Step 6: Validate report headers
    const expectedHeaders = [
      'Owner', 'Pen No.', 'Lot No.', 'Gender', 'In Date', 'In Pwt.', 'Cur Wght',
      'DOF', 'Head', 'In Pen', 'In Hosp', 'Real', 'Dead', 'Ship',
      'Ratn', '7Dy LTD', 'LTD', 'ROG', 'Estimated Ship Date', 'Wgt'
    ];

    expectedHeaders.forEach(header => {
      cy.contains(header).should('exist');
    });

    // Step 7: Validate Location and Date in the report
    cy.contains('Location: Hedstrom Feedlot').should('exist');
    cy.contains('4/1/2025').should('exist');

    // Step 8: Validate data row for 'Baer Livestock'
    cy.contains('tr', 'Baer Livestock').within(() => {
      const rowValues = [
        'Baer Livestock', '0020', 'BL24-2', 'HF', '02/10/2025', '686',
        '0*', '59', '175', '175', '0', '0', '0', '0', '0',
        'M2', '0.00', '0.00', '0.00', '08/07/2025', '1,200'
      ];

      rowValues.forEach(value => {
        cy.contains(value).should('exist');
      });
    });

    // Step 9: Define expected values for Lot Detail verification
    const rowData = {
      Owner: 'Baer Livestock',
      Lot: 'H101720',
      Pen_No: '0022',
      Gender: 'HF',
      Head: '136',
      In_Pwt: '739'
    };

    // Step 10: Navigate to the Lot Detail screen
    cy.get(nav.Processing).click();
    cy.get(nav.Lot_Detail).click();

    // Step 11: Enter the Lot Number and submit
    cy.get('#txtEditLotNumber')
      .type(rowData.Lot)
      .type('{enter}');
    cy.wait(2000); // Wait for Lot Detail screen to load

    // Step 12: Validate data on the Lot Detail screen
    cy.contains(rowData.Owner).should('exist');
    cy.contains(rowData.Lot).should('exist');
    cy.contains(rowData.Pen_No).should('exist');
    cy.contains(rowData.Gender).should('exist');
    cy.contains(rowData.In_Pwt).should('exist');
    cy.contains(rowData.Head).should('exist');
  });
});
