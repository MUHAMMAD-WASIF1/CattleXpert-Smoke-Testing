Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe("Feed Call", () => {
  it("should call the feed for all pens", ()=> {
    cy.Login()
    cy.dbsetup()
    cy.get('#fldset_Feed > #lnkFeedCall').click()
    cy.wait(2000)
    cy.url().should("include", "FeedCall.aspx");
    cy.wait(2000)
    
    cy.get('#ddlBunkScore').select(3)
    cy.wait(200)
    cy.get('#ddlPenAction').select(2)
    cy.wait(200)
    cy.get('#btnPInc').click()
    cy.wait(200)
    cy.get('#btnNextPen').click()


})
});
describe("Create Feed load 1", () => {
  it("should login and create 1st load", () => {

    //Using custom command to login into the system
      cy.Login()
    //Using custom command here to setup the db 
      cy.dbsetup()
      cy.wait(2000)
    //Select the create loads link to redirect to the create loads screen
    cy.get('#fldset_Feed > #lnkCreateLoads').click();
    //Verify the page url
    cy.url().should("include", "CreateLoads.aspx");
    cy.wait(2000)
    //select the create loads dropdown & select load 1 
    cy.get('#ddlCreateLoads').select(1);
    //Click the create loads button
    cy.get('#btnCreateLds').click();
    cy.get('#popup_container').should("be.visible");
    cy.get('#popup_ok').click()
    cy.wait(2000)
    cy.get('#popup_ok').click()

    //select the create loads dropdown & select load 2
    cy.get('#ddlCreateLoads').select(2);
    //Click the create loads button
    cy.get('#btnCreateLds').click();
    cy.get('#popup_container').should("be.visible");
    cy.get('#popup_ok').click()
    cy.wait(2000)
    cy.get('#popup_ok').click()

    //select the create loads dropdown & select load 3
    cy.get('#ddlCreateLoads').select(3);
    //Click the create loads button
    cy.get('#btnCreateLds').click();
    cy.get('#popup_container').should("be.visible");
    cy.get('#popup_ok').click()
    cy.wait(2000)
    cy.get('#popup_ok').click()



  });


});

 

