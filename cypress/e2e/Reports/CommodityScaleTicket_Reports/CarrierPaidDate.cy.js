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

  it("Generating and verifying data of Carrier Paid Date Report", () => {
    // Log in to the application
    login_headstrom();

    // Navigate to "Customer Closeout" report
    cy.get(nav.Reports).click();
    cy.get(nav.CommodityScaleTicket_Reports).click();
    cy.get(nav.R_CarrierPaidDates).click();

    // Wait for the report to load
    cy.wait(2000);

    //Enter the Start Date
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue')
    .type("4/1/2024 ");

    // Wait for the report to load
    cy.wait(2000);

    //Enter the End Date
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_txtValue')
    .type("04/21/2025");

    // Click on the 'View Report' button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    // Wait for the report to load
    cy.wait(3000);

    // Verify the headers of the report
    cy.contains("Carrier Paid Date").should("exist");
    cy.contains(/GROUP\s*KEY/).should("exist");
    cy.contains(/Ticket\s*Number/).should("exist");
    cy.contains("Date").should("exist");
    cy.contains("Commodity").should("exist");
    cy.contains("I/O").should("exist");
    cy.contains(/Gross\s*Weight/).should("exist");
    cy.contains(/Tare\s*Weight/).should("exist");
    cy.contains(/Net\s*Weight/).should("exist");
    cy.contains(/Adj\s*Weight/).should("exist");
    cy.contains("Carrier").should("exist");
    cy.contains(/TK\s*Number/).should("exist");
    cy.contains(/Frieght\s*Rate/).should("exist");
    cy.contains(/Frieght\s*Amount/).should("exist");
    cy.contains(/Frieght\s*Date/).should("exist");
    cy.contains("Comments").should("exist");
    cy.contains(/Doc\s*Num/).should("exist");
    cy.contains(/Emp\s*Num/).should("exist");
    
    //stored expected values
    const expectedData = {
      Commodity: "Corn",
      Date: "04/21/2025",
      Gross_Weight: "10,000",
      Tare_Weight: "50",
      Net_Weight: "9,950",
      Carrier: "JH",

    };
   
        // Navigate to the Commodity_Contract_Scale_Ticket screen
        cy.get(nav.Commodity).click();
        cy.get(nav.Commodity_Contract_Scale_Ticket).click();
        cy.wait(3000);

        // Select the contract number
        cy.get('#ddlSContractNumber').select('JHS1');
        cy.wait(2000);
        cy.scrollTo('bottom');

       //verify the values in the Commodity_Contract_Scale_Ticket screen 
      cy.contains(expectedData.Commodity).should('exist');
      cy.contains(expectedData.Date).should('exist');
      cy.contains(expectedData.Gross_Weight).should('exist');
      cy.contains(expectedData.Tare_Weight).should('exist');
      cy.contains(expectedData.Net_Weight).should('exist');
      cy.contains(expectedData.Carrier).should('exist');

    });
  });