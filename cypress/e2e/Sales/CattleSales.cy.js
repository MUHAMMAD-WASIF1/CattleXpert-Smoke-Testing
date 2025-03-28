import logindata from '../../fixtures/logindata.json';
import 'cypress-xpath';
import dayjs from 'dayjs';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe('Cattle Sale Shipment process', () => {
  beforeEach(() => {
    cy.visit('/Login.aspx');

    // Clear cookies, localStorage, and sessionStorage
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });

    // Reload the page to reset state
    cy.reload();

    cy.get('#txtUserName').type(logindata.name);
    cy.get('#txtPassword').type(logindata.pass);
    cy.get('#btnLogin').click();
    cy.get('#ddlFeedyardList').select(logindata.database);
    cy.get('#btnConnect').click();

    // Hover over the Sales menu and navigate to Realizer Sale Worksheet
    cy.contains('Sales').trigger('mouseover');
    cy.contains('Cattle Sale').click();

    // Ensure user is on Realizer Sale Worksheet page
    // cy.url().should('include', 'CattleSales');
  });

  it('verify that the cattle lot shipment process correctly by the verifying eah step, from scale ticket creation to shipment confirmation Message', () => {
    
    cy.get('#txtEditLotNumber').type('423'); // Type the desired lot number
    cy.wait(500); // Wait for autocomplete suggestions to appear (adjust the time if needed)
    cy.get('.ui-menu-item').contains('423').click(); // Click the option you want (modify the selector as needed)

    cy.wait(5000); // Wait for data to load

    cy.get('#ddlPenNumbers').select('AP11'); // select pen number 
    // cy.get('.ui-menu-item').contains('0510').click();

    // Random scale ticket generate 
    const ScaleTicket = Math.floor(1000 + Math.random() * 9000);
    cy.get('#txtTicketNumber').type(ScaleTicket);
    cy.get('#txtCapacity').clear().type('50');
    cy.get('#ulScaleTicketInfo > li.w33.reduceGap > ul > li:nth-child(8) > label:nth-child(1) > input[type=radio]').click();
    cy.get('#ddlLocationCustomer').select('Butcher');
    const Shipment_number = Math.floor(1000 + Math.random() * 9000);
    cy.get('#txtShipmentNumber').type(Shipment_number);
    cy.get('#ddlCarcassFormulas').select('CAR-2');

    // Generating the current date
    const currentDate = dayjs().format('MM/DD/YYYY hh:mm:ss A');
    cy.get('#txtScaleTicketDate').type(currentDate);
    cy.get('#txtScaleTicketNetWeight').clear().type('25000');
    cy.get('#ddlCariers').select('M&R');
    // Generate a random truck number
    const randomTruckNumber = `Truck${Math.floor(1000 + Math.random() * 9000)}`;
    cy.get('#txtTruckNumber').clear().type(randomTruckNumber);
    cy.get('#txtScaleTicketNotes').clear().type('Automation Test');
    cy.get('#btnScaleTicketSave').click();

    // Shipment/location Transfer Tab
    cy.get('#ShipmentLocation > a > span').click();
    cy.xpath('/html/body/form/section[1]/section[2]/section/section[1]/article/section[2]/div[2]/div/div[2]/div/div/section[3]/div/div/div[3]/div[3]/div/table/tbody/tr[2]').click();
    cy.wait(5000)
    cy.get('#txtGrossAmt').clear().type('400.00');
    cy.get('#txtBeefCouncil').clear().type('10.00');
    cy.get('#txtFreight').clear().type('3.00');
    cy.get('#UDF_JKS3').clear().type('14.00');
    cy.get('#UDF_JKS4').clear().type('158.00');

    // Set the date 15 days in the future
    const futureDate = dayjs().add(15, 'day').format('MM/DD/YYYY');
    cy.get('#dtpSPaymtDte').clear().type(futureDate);
    const Checknum = Math.floor(1000 + Math.random() * 9000);
    cy.get('#txtChkNum').clear().type(Checknum);
    const Freight_Doc = Math.floor(1000 + Math.random() * 9000);
    cy.get('#txtFrghtDoc').clear().type(Freight_Doc);
    cy.get('#txtNotes').clear().type('Automation shipment');
    cy.get('#btnShipmentSave').click();
  });
});