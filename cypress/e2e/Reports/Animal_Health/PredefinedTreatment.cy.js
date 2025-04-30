import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and verifying data of Predefined Treatment", () => {
    login_headstrom();

    // Navigate to the "Hospital Activity" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Animal_health).click();
    cy.get(nav.R_AnimalHealth_PredefinedTreatment).click();
    cy.wait(5000);

    // Verify the key headers of the report
    cy.contains("Treatment").should("exist");
    cy.contains(/Withdrawal\s*Days/).should("exist");
    cy.contains(/Withdrawal\s*Weeks/).should("exist");
    cy.contains("Diagnosis").should("exist");
    cy.contains(/Day\s*Number/).should("exist");
    cy.contains(/Seq\s*Num/).should("exist");
    cy.contains("Description").should("exist");
    cy.contains("Qty").should("exist");
    cy.contains("UOM").should("exist");
    cy.contains(/CWT\s*Flag/).should("exist");
    cy.contains(/Charge\s*Type/).should("exist");

    // Store expected values
    const expectedData = {
      Treatment: "Arovyn",
      Withdrawal_Days: "0",
      Qty: "1.00",
      UOM: "Head",
    };

    // Navigate to System Setup and Animal Details screen
    cy.get(nav.System_Setup).click();
    cy.get(nav.System_Setup_Health).click();
    cy.get(nav.System_Setup_Health_PredefinedTreatments).click();
    cy.wait(5000);

    // Click on the first row of the grid to select it
    cy.get(
      '#JHS49 > [aria-describedby="preTreatmentsGridView_TreatmentDescription"]'
    ).click({ force: true });
    cy.wait(3000);

    // Verify data in System Setup_Health > Predefined Treatments scree
    cy.contains(expectedData.Treatment).should("exist");
    cy.contains(expectedData.Withdrawal_Days).should("exist");
    cy.contains(expectedData.Qty).should("exist");
    cy.contains(expectedData.UOM).should("exist");
  });
});
