import { login } from "../../support/funcation.js";

describe('Creating an Apply Revenue', () => {
  let nav;
  beforeEach(() => {
    cy.fixture("jackson_Beta_navigation").then((jackson_Beta_navigation) => {
      nav = jackson_Beta_navigation;
    });
  });

  it('Should select dropdown value, pick a date range, and proceed', () => {
    login();

    // Navigate to Invoice and Charge Entry
    cy.get(nav.Invoice).click();
    cy.get(nav.Charge_Entry).click();
  });
});



