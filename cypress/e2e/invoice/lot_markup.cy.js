import { login } from "../../support/funcation.js";

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
    cy.get(nav.Lot_Markup).should("exist").click(); 

    // Type "TESTER" into the Lot Number field
    cy.get('#txtLot').clear().type("UZAIR01"); 

    // Select "Ration Type" as "Grower"
    cy.get('#txtRation').type("Grower"); 

    // Set the "In Effect" date to "04/18/2025"
    cy.get('#txtInEffective').clear().type("04/18/2025"); 

    // Select the "Dollar" radio button for Markup
    cy.get('#optInterest').check(); 

    // Enter "5" as the Markup value
    cy.get('#markupValue').clear().type("5");

    // Click the "Save" button
    cy.get('#btnRationSave').click(); 

    // Handle the alert and verify its content
    cy.on("window:alert", (alertText) => {
        expect(alertText).to.equal("Ration Markup has been updated successfully.");
      });
  });
});
