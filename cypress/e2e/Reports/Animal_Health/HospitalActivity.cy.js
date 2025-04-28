import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("Verify  Hospital Activity Report", () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generate and Verify the Hospital Activity Report", () => {
    login_headstrom();

    // Navigate to the "Hospital Activity" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Animal_health).click();
    cy.get(nav.R_AnimalHealth_HospitalActivity).click();
    cy.wait(2000);

    // Set 'Start Date' and 'End Date'
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_txtValue"
    ).type("4/7/2025");
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue"
    ).type("4/14/2025");

    // Step 4: Click the "View Report" button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    // Wait for the report to load
    cy.wait(3000);

    //Verify the key headers of the report
    const expectedHeaders = [
      "Animal",
      "From Pen",
      "ToPen",
      "Home Pen",
      "Lot",
      "Owner",
      "DOF",
      "Treatment",
      "Temp",
      "Technician",
      "Clear Week",
      "Rider",
    ];

    // Store expected values
    const expectedData = {
      From_Pen: "0002",
      To_Pen: "0002",
      Lot: "TL24-2",
    };

    //Navigate to Health module and Animal Details screen
    cy.get(nav.Health).click();
    cy.get(nav.Health_Animal_Deatail).click();

    //Enter the Animal ID in the search box
    cy.get("#txtAnimal").type("ASDFGHJ-1", { force: true });
    cy.get("#txtPayWeight").click();

    //Verify the data of the report in the Animal Details screen
 
    cy.contains(expectedData.From_Pen).should("exist");
    cy.contains(expectedData.To_Pen).should("exist");
    cy.contains(expectedData.Lot).should("exist");
    
  });
});
