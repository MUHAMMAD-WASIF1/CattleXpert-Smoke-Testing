import { login_headstrom } from "../../support/funcation";
import "cypress-xpath";

describe("LOGIN TO CATTLEXPERT WEBSITE", () => {
  let nav;
  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it("Generating and verifying data of Show List Report", () => {
    login_headstrom();

    // Navigate to "Feeding Load" report
    cy.get(nav.Reports).click(); // Navigate to reports
    cy.get(nav.ShowList_Report).click(); // Click on Show List Report
    cy.wait(2000); // Wait for to load

    //Select the began date and end date

    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_txtValue"
    )
      .invoke("val", "10/1/2024 ")
      .trigger("input") // or 'change' if needed
      .trigger("blur");

    cy.wait(2000); // Wait for to load

    // Select the end date
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_txtValue"
    )
      .invoke("val", "4/30/2025")
      .trigger("input") // or 'change' if needed
      .trigger("blur");

    // Click on the view report button
    cy.get(
      "#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00"
    ).click();

    // Wait for report to load (adjust as needed)
    cy.wait(3000);

    // Verify report headers
    cy.contains("Show List Report").should("exist");
    cy.contains("Hedstrom Feedlot").should("be.visible");
    cy.contains("Lot").should("be.visible");
    cy.contains("Pen").should("be.visible");
    cy.contains("Gender").should("exist");
    cy.contains("DOF").should("be.visible");
    cy.contains(/Est\s*DOF/).should("exist");
    cy.contains(/Pay.\s*Wght/).should("exist");
    cy.contains(/Curr\s*Wght/).should("exist");
    cy.contains(/Tot\s*Head\s*Count/).should("exist");
    cy.contains(/Hosp\s*Head\s*Cnt/).should("exist");
    cy.contains(/Net\s*HD/).should("exist");
    cy.contains(/Cntrct\s*Pgm/).should("exist");
    cy.contains("MW").should("be.visible");
    cy.contains(/Impl\s*Date/).should("exist");
    cy.contains(/7\s*Day/).should("exist");
    cy.contains("GR?").should("be.visible");
    cy.contains("LTD").should("be.visible");
    cy.contains("Sold").should("exist");
    cy.contains(/Head\s*Schd/).should("exist");
    cy.contains(/Ship\s*Date/).should("exist");
    cy.contains("Origin").should("exist");

    //stored expected values
    const expectedData = {
      Lot: "CCC24-2",
      Pen: "0032",
      Gender: "HF",
      DOF: "213",
      curr_weight: "523",
      Tot_Head_Count: "106",
      Owner: "Cottonwood Creek Cattle Co",
    };

    //navigate to the Sales Module and Show List Worksheet screen
    cy.get(nav.Sales).click(); // Navigate to Sales Module
    cy.get(nav.Show_List_Worksheet).click(); // Click on Show List Worksheet
    cy.wait(2000); // Wait for to load

    //Selecting the Lot and Pen from the dropdowns
    cy.get("select#ddlLot").select("JHS65").should("have.value", "JHS65");

    cy.get("select#ddlPen").select("JHS4556").should("have.value", "JHS4556");

    //click on the refresh button
    cy.get("#btnRefresh").click();

    //Verify the values from summary tab
    cy.contains(expectedData.Lot).should("exist");
    cy.contains(expectedData.Pen).should("exist");
    cy.contains(expectedData.Gender).should("exist");
    cy.contains(expectedData.DOF).should("exist");
    cy.contains(expectedData.curr_weight).should("exist");
    cy.contains(expectedData.Tot_Head_Count).should("exist");
    cy.contains(expectedData.Owner).should("exist");

     //click on the refresh button
     cy.get("#btnRefresh").click();
  });
});
