import logindata from '../../../fixtures/logindata.json';
import dayjs from "dayjs";
import "cypress-xpath";

Cypress.on("uncaught:exception", (err, runnable) => {
  if (
    err.message.includes("$ is not defined") ||
    err.message.includes("jquery_lang_js is not defined")
  ) {
    return false;
  }
});

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

describe("should navigate to Cattle Base Weight successfully", () => {
  beforeEach(() => {
    cy.visit("/Login.aspx");

    // Clear cookies, localStorage, and sessionStorage
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });

    // Reload the page to reset state
    cy.reload();

    // Perform login
    cy.get("#txtUserName").type(logindata.name);
    cy.get("#txtPassword").type(logindata.pass);
    cy.get("#btnLogin").click();
    cy.get("#ddlFeedyardList").select(logindata.database);
    cy.get("#btnConnect").click();

    // Navigate to the required section
    cy.get("#Item_COR48").click();
    cy.get("#Item_COR49").click();
    cy.get("#Item_COR52").click();
  });

  it("Create a Cattle Base Weight", () => {
    const baseWeightOptions = [400, 500, 600];
    const randomBaseWeight = getRandomElement(baseWeightOptions);

    const deliverPriceOptions = [220, 235, 249];
    const randomDeliverPrice = getRandomElement(deliverPriceOptions);

    cy.get('#lnkCattleBaseWeight > [lang="en"]').click();

    cy.get("#txtBaseWeight").type(randomBaseWeight.toString());
    cy.get("#txtDeliverPrice").type(randomDeliverPrice.toString());

    const currentDate = dayjs().subtract(1, "month").format("MM/DD/YYYY hh:mm:ss A");
    cy.xpath('//*[@id="txtInEffective"]')
      .invoke("val", currentDate)
      .trigger("input")
      .trigger("change");

    const outEffectiveDate = dayjs().format("MM/DD/YYYY hh:mm:ss A");
    cy.get("#txtOutEffective")
      .invoke("val", outEffectiveDate)
      .trigger("input")
      .trigger("change")
      .should("have.value", outEffectiveDate);

    const slideOutOptions = [2.1, 2.4, 2.9, 3.1];
    const randomSlideOut = getRandomElement(slideOutOptions);
    cy.get("#txtSlideOut").clear().type(randomSlideOut.toString());

    cy.get("#btnSave").click();
  });

  it("Update a Cattle Base Weight", () => {
    cy.get('#lnkCattleBaseWeight > [lang="en"]').click();

    // Get all rows in the grid
    cy.get('#gview_productGridView tbody tr').then(rows => {
      const rowCount = rows.length;
      const randomRowIndex = Math.floor(Math.random() * rowCount);

      // Select a random row
      cy.get(`#gview_productGridView tbody tr:eq(${randomRowIndex})`).click();

      // Update the Delivery Price Per CWT
      const newDeliverPrice = 300; // New value to update
      cy.get("#txtDeliverPrice").clear().type(newDeliverPrice.toString());

      // Save the changes
      cy.get("#btnSave").click();

      // Verify the update
      cy.get(`#gview_productGridView tbody tr:eq(${randomRowIndex}) td`).contains(newDeliverPrice.toString());
    });
  });
});
