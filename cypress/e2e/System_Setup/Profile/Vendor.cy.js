import logindata from '../../../fixtures/logindata.json';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

describe('should navigate to Vendor profile successfully', () => {
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
    cy.get('#Item_COR132').click();
  });

  it('Create a Vendor profile', () => {
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
    const email = `vendor${Math.floor(Math.random() * 1000000)}@test.com`;
    const address = `address${Math.floor(Math.random() * 1000000)}`;
    const vendor_number = `987${Math.floor(Math.random() * 10000)}`;
    const LicenseNumber = `592${Math.floor(Math.random() * 20000)}`;

    // Fill out the Vendor Profile form
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

    // Fill Vendor details
    cy.get('#txtVendorNumber').type(vendor_number);
    cy.get('#txtLicenseNumber').type(LicenseNumber);
    cy.get('#txtRemarks').type('Automate Vendor');


    // Country selection with random value
    const VendorType = ["Commodities", "Commission Buyer", "Producer/Commodity", "Pharmaceutical", "Producer"];
    const randomvendortype = getRandomElement(VendorType);

    // Debugging step to log the selected country
    cy.log(`Selected vendor type: ${randomvendortype}`);

    // Ensure the dropdown is visible before selecting
    cy.get('#ddlVendorType').should('be.visible').select(randomvendortype, { force: true });

    // Vendor type selection with random value

    // Save the Vendor Profile
    cy.get('#btnVendorSave').click();

    cy.get('#ChkShowAllUserProfile').click();

    // Verify the creation
    cy.contains(companyName).should('exist');
  });
});
