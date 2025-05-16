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

  it("Verify Lot Owner Changes Report", () => {
    // Step 1: Log in to the application
    login_headstrom();

    // Step 2:  Navigate to the Reports
    cy.get(nav.Reports).click();
    cy.get(nav.R_invoice).click();
    cy.get('#Item_JHS226').click(); // Replace with actual Lot Owner Changes report ID
    cy.wait(2000); // Wait for report to load

   // Select date range
   cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue').type('04/30/2025'); // Start Date
   cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_ddValue').select('1'); // Select "equal to 100" dropdown
   cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();
   //wait for the report to load
    cy.wait(2000);
       // Invoke and store values
    let Lot_Owner_Code, Lot_Owner_Own, Lot_Number,Lot_Invoice_Owner, Total; ;
    cy.get("td")
      .contains("BS")
      .invoke("text")
      .then((text) => {
        Lot_Owner_Code = text.trim();
      });
    cy.get("td")
      .contains("100.000")
      .first()
      .invoke("text")
      .then((text) => {
        Lot_Owner_Own = text.trim();
      });
       cy.get("td")
      .contains("CCC24-2")
      .first()
      .invoke("text")
      .then((text) => {
        Lot_Number = text.trim();
      });
      cy.get("td")
      .contains("Cottonwood Creek Cattle Co")
      .first()
      .invoke("text")
      .then((text) => {
        Lot_Invoice_Owner = text.trim();
      });
      cy.get("td")
      .contains("4,522.190")
      .first()
      .invoke("text")
      .then((text) => {
        Total = text.trim();
      });


      //navigate to Lot Detail page
      cy.get(nav.Processing).click();
      cy.get(nav.Lot_Details).click(); 

      cy.get("#txtEditLotNumber").type("CCC24-2"); // Type the desired lot number
      cy.wait(500); // Wait for autocomplete
      cy.get(".ui-menu-item").contains("CCC24-2").click(); // Click the option you want

      cy.wait(2000);
      cy.scrollTo('bottom'); // Use lowercase 'bottom'

      // Step 3: Verify Lot Owner and lot number
      cy.get('#MovementHistoryGrid').within(() => {
        cy.contains('td', Lot_Number).should('be.visible'); // Verify Lot Number in grid
      });
      cy.contains('button, span, a', 'Invoices').click(); // Click the Invoices tab by visible text
      cy.wait(2000);
      // Now verify the data in the Invoices tab grid
      cy.contains('td', Lot_Owner_Code).should('be.visible'); // Verify Lot Owner Code in grid
      cy.contains('td', Lot_Owner_Own).should('be.visible'); // Verify Lot Owner Own in grid
      cy.contains('td', Lot_Invoice_Owner).should('be.visible'); // Verify Lot Invoice Owner in grid
      cy.contains('td', Total).should('be.visible'); // Verify Total in grid
  });
});