import logindata from '../../../fixtures/logindata.json';
import 'cypress-xpath';

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
        return false;
    }
});

describe('should be navigate to the Prior Feed', () => {
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

        // Navigate to Prior Feed
        cy.get('#Item_COR48').click();
        cy.xpath('/html/body/form/section[1]/nav/ul/li[11]/ul/li[15]/a').click();
        cy.contains('Prior Feed').click();
    });

    it('Create a new Prior Feed with valid description and short name', () => {
        function generateRandomString(length) {
            const characters = 'abcdefghijklmnopqrstuvwxyz';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }

        const PF_randomDescription = `Description_${generateRandomString(8)}`;
        const PF_randomShortName = generateRandomString(3);

        cy.get('#lnkNewrisk > [lang="en"]').click();
        cy.get('#txtDesription').should('be.visible').type(PF_randomDescription);
        cy.get('#txtPriorFeedShortName').should('be.visible').type(PF_randomShortName);
        cy.get('#btnSave').click();
    });

    it('Update an existing Prior Feed with a new valid description and short name', () => {
        function generateRandomString(length) {
            const characters = 'abcdefghijklmnopqrstuvwxyz';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }

        const new_PF_randomDescription = `Updated_Description_${generateRandomString(8)}`;
        const new_PF_randomShortName = generateRandomString(3);

        // Find and click on the specific Prior Feed description cell in the grid
        cy.get('#JKS12 > [aria-describedby="priorFeedGridView_Description"]')
            .scrollIntoView()
            .should('be.visible')
            .click(); // Click the selected row to open for updating

        // Update the selected Prior Feed
        cy.get('#txtDesription').scrollIntoView().should('be.visible').clear().type(new_PF_randomDescription);
        cy.get('#txtPriorFeedShortName').scrollIntoView().should('be.visible').clear().type(new_PF_randomShortName);
        cy.get('#btnSave').click();
    });
});