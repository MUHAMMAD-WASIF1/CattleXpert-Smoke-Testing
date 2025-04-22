import { login } from "../../support/funcation.js";
import 'cypress-xpath';

describe("Invoice Processing Automation", () => {
  let nav;

  // Load navigation fixture before each test
  beforeEach(() => {
    cy.fixture("jackson_Beta_navigation").then((jackson_Beta_navigation) => {
      nav = jackson_Beta_navigation; // Assign navigation data to the `nav` variable
    });
  });

  it("User should navigate to the Lot Markup screen and proceed", () => {
    // Log in to the application
    login();

    // Navigate to the Invoice menu
    cy.get(nav.Invoice).should("exist").click(); 
    

    // Navigate to the Lot Markup screen
    cy.get(nav.Lot_Finance).should("exist").click(); 

    
    cy.get('#txtLotFinance').click().type('HAS{downarrow}{enter}');

    cy.get('#optCattle').click();
    cy.wait(5000); // waits for 5 seconds
    cy.get('#btnAddRow').click({ force: true });
    cy.xpath('//*[@id="5_CattleEquity"]').click().type('10');
    cy.xpath('//*[@id="5_FeedMiscellaneous"]').click().type('20');
    cy.xpath('//*[@id="5"]/td[1]/input[2]').click();
    cy.get('#btnSave').click();
     
});

});
