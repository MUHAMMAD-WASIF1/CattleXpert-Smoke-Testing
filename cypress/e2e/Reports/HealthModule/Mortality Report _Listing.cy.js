import { login_headstrom } from '../../../support/funcation';
import 'cypress-xpath';

describe('Verify Daily Feed Per Pen (Feed In) and Feed Status Data', () => {
  let nav;

  beforeEach(() => {
    cy.fixture("headstrom_navigation").then((headstrom_navigation) => {
      nav = headstrom_navigation;
    });
  });

  it('Verify data between Daily Feed Per Pen (Feed In) and Feed Status', () => {
    login_headstrom();

    // Navigate to "Daily Feed Per Pen (Feed In)" report
    cy.get(nav.Reports).click();
    cy.get(nav.R_Animal_health).click();
    cy.get(nav.R_Mortality).click();
    cy.get(nav.R_Listing).click();

    // Select the 10th date from the calendar
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_ddValue').select('ALL');
    // Set 'Start Date' and 'End Date'
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05_txtValue').type('4/1/2025 12:00:00 AM');
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl07_txtValue').type('4/22/2025 12:00:00 AM');

    // Set 'Owner' dropdown to 'ALL'
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl09_ddValue').select('ALL');

    // Set 'Group By Owner?' to True
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl11_ddValue').select('True');

    // Set 'Sort Sequence' to 'Date'
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl13_ddValue').select('Date');

    // Click 'View Report' button
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click();

    // // Verify Pen 0001 is visible in the report
    // cy.get('table').contains('td', '0001').should('be.visible');

    // // Capture data for Pen 0001 from the report
    // cy.get('table')
    //   .contains('td', '0001')
    //   .parent('tr')
    //   .then((row) => {
    //     const feed1 = row.find('td').eq(3).text(); // Feed 1
    //     const feed2 = row.find('td').eq(4).text(); // Feed 2
    //     const feed3 = row.find('td').eq(5).text(); // Feed 3
    //     const totalFeed = row.find('td').eq(6).text(); // Total Feed

    //     // Log the captured data
    //     cy.log(`Feed 1: ${feed1}, Feed 2: ${feed2}, Feed 3: ${feed3}, Total Feed: ${totalFeed}`);

    //     // Log the captured Total Feed data
    //     cy.log(`Total Feed from report: ${totalFeed}`);

    //     // Assert that Total Feed is not empty or undefined
    //     expect(totalFeed).to.not.be.empty;
    //     cy.log('Total Feed value is valid.');

    //     // Add a slight delay to observe the captured data
    //     cy.wait(2000); // Wait for 2 seconds

    //     // Navigate to "Feed Status" screen
    //     cy.get(nav.Feed).click();
    //     cy.get(nav.Feed_Status).click();

    //     // Select the 10th date from the calendar
    //     cy.get('.ui-datepicker-trigger').click({ force: true });
    //     cy.get('.ui-datepicker-calendar').contains('17').click({ force: true });
    //     cy.get('#btnRefresh').click();

    //     // Verify Pen 0001 Total Feed data matches the report
    //     cy.get('table')
    //       .contains('td', '0001') // Locate Pen 0001
    //       .parent('tr') // Get the row for Pen 0001
    //       .within(() => {
    //         cy.get('td[aria-describedby="PenStatusGridView_TotalCall"]') // Target the
          });
      });
 // });
//});