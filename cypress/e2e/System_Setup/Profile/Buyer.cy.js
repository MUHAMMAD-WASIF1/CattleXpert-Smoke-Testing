import logindata from '../../../fixtures/logindata.json';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

describe('should navigate to Buyer profile successfully', () => {
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

    cy.get('#Item_COR48').click();
    cy.get('#Item_COR125').click();
    cy.get('#Item_COR126').click();
  });

  it('Create a Buyer profile', () => {
    cy.get('#lnkAddProfile > span').click();

    const companyNames = ["acmecorp pvt ltd", "globex inc", "soylent corp", "initech llc", "umbrella corp"];
    const shortNames = ["ac", "gx", "sl", "it", "um"];
    const firstNames = ["john", "jane", "alex", "chris", "pat"];
    const lastNames = ["doe", "smith", "johnson", "brown", "davis"];
    const nickNames = ["johnny", "janie", "lex", "chris", "patty"];

    const companyName = getRandomElement(companyNames);
    const shortName = getRandomElement(shortNames);
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const phoneNumber = `123456${Math.floor(Math.random() * 1000000)}`;
    const faxNumber = `598456${Math.floor(Math.random() * 1000000)}`;
    const email = `buyer${Math.floor(Math.random() * 1000000)}@test.com`;
    const address = `address${Math.floor(Math.random() * 1000000)}`;
    const nickName = getRandomElement(nickNames);

    // Fill out the Buyer Profile form
    // cy.get('#feedyardName').select('JacksonSandbox');
    cy.get('#txtPrcompanyName').type(companyName);
    cy.get('#txtPrShortName').type(shortName);
    cy.get('#txtPrFirstName').type(firstName);
    cy.get('#txtPrLastName').type(lastName);
    cy.get('#txtPhone').type(phoneNumber);
    cy.get('#txtFaxPhone').type(faxNumber);
    cy.get('#txtEmailAddress').type(email);
    cy.get('#txtAddress').type(address);

    // Country selection with random value
    const countries = ["Canada", "Mexico", "United States", "United Kingdom"];
    const randomCountry = getRandomElement(countries);

    // Debugging step to log the selected country
    cy.log(`Selected country: ${randomCountry}`);

    // Ensure the dropdown is visible before selecting
    cy.get('#ddlCountry').should('be.visible').select(randomCountry, { force: true });
  
    // City selection with random value
    const cities = ["new york", "toronto", "mexico city", "london", "los angeles", "vancouver", "guadalajara", "manchester"];
    const randomCity = getRandomElement(cities);
    cy.get('#txtCity').type(randomCity);
    
    // Random Website
    const websites = ["https://example.com", "https://testsite.org", "https://randomweb.net", "https://demoapp.io"];
    const randomWebsite = getRandomElement(websites);
    cy.get('#txtWebsite').type(randomWebsite);
    // Activate Buyer
    // cy.get('#buyerActiveToggle').click();

    // Fill Buyer details
    cy.get('#txtBuyerNickName').type(nickName);
    cy.get('#txtBuyerOfficePhone').type(phoneNumber);
    cy.get('#txtBuyerEmailAddress').type(email);

    // Save the Buyer Profile
    cy.get('#btnSaveBuyer').click();

    cy.get('#ChkShowAllUserProfile').click();

    // Verify the creation
    cy.contains(companyName).should('exist');
  });
});
