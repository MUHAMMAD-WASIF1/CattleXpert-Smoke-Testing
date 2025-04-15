import 'cypress-xpath';
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

    // Select value '0811' from the custom dropdown
    cy.xpath('./html/body/form/section[1]/section[2]/section/section[1]/article/section/section[1]/ul/li[2]/span/a') // Adjust the selector to match the dropdown toggle button
      .click(); // Open the dropdown

    cy.get('.ui-menu-item') // Adjust the selector to match the dropdown options
      .contains('0811') // Find the option with the text '0811'
      .click(); // Click to select the option

    // Open the calendar and select a date range
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    // Format dates as needed (e.g., MM/DD/YYYY)
    const formatDate = (date) =>
      `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
        .getDate()
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;

    const fromDate = formatDate(oneMonthAgo);
    const toDate = formatDate(today);

    // Interact with the "From" date picker
    cy.get('input[placeholder="From"]') // Adjust the selector to match the "From" date input
      .clear()
      .type(fromDate)
      .should('have.value', fromDate);

    // Interact with the "To" date picker
    cy.get('input[placeholder="To"]') // Adjust the selector to match the "To" date input
      .clear()
      .type(toDate)
      .should('have.value', toDate);

    // Perform any additional actions if needed
    cy.get('button').contains('Search').click(); // Example: Click a "Search" button
  });
});



