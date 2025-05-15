import { login_headstrom } from "../../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and Verifying data of Head Counts By Gender Report", () => {
    login_headstrom();

    // Navigate to the "Cattle On Feed" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Cattle).click();
    cy.get(nav.R_Cattle_HeadCountsByGender).click();
    cy.wait(3000);

    //Verify the key headers of the report
    cy.contains("Head Count By Gender").should("exist");
    cy.contains("Lot Num").should("exist");
    cy.contains("Pen Num").should("exist");
    cy.contains(/Avg. Cur\s*Wght/).should("exist");
    cy.contains(/Total Head\s*Count/).should("exist");
    cy.contains(/Less\s*Than \s*500/).should("exist");
    cy.contains(/500-\s*600/).should("exist");
    cy.contains(/600-\s*700/).should("exist");
    cy.contains(/700-\s*800/).should("exist");
    cy.contains(/900-\s*1000/).should("exist");
    cy.contains(/1000-\s*1100/).should("exist");
    cy.contains(/1100-\s*1200/).should("exist");
    cy.contains(/More\s* Than \s*1200/).should("exist");

    // Store expected values
    const expectedData = {
      Lot_Num: "ANH-01",
      Pen: "ANH1",
      Avg_Cur_Wght: "600",
      Head: "200",
    };

    //Navigate to Processing module and Pen Details screen
    cy.get(nav.Processing).click();
    cy.get(nav.Pen_Details).click();
    cy.wait(2000);

    // Type 'ANH1' into the dropdown
    cy.get(".relative > .custom-combobox")
      .type("ANH1") // Type the value
      .type("{enter}")// Click to select it
    cy.wait(2000);

    // Verify data in the Pen Details screen
    cy.contains(expectedData.Avg_Cur_Wght).should("exist");
    cy.contains(expectedData.Head).should("exist");
    cy.contains(expectedData.Lot_Num).should("exist");
    cy.contains(expectedData.Pen).should("exist");
    cy.scrollTo("bottom");

  });
});
