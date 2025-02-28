import { login } from '../support/function.js';


describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        login();
    })
})

describe('Treat An animal', () => {

    it('NAVIGATION TO HEALTH > Treat/Dead/Realize', () => {
        //Treat/Dead/Realize
    cy.get('#Item_JHS31').click()
    cy.get('#lnkAnimalTreatment').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Treat/Dead/Realize').should('be.visible')
    })

    it('Select animal and verify', () => {
        //Select Animal 
    cy.get('#txtAnimal')
    .focus()
    .type('1212-11')
  //Random click to fetch data
  cy.get('.relative > .red').click()
  cy.wait(2000)
  cy.get('#popup_message').should('contain', 'Treat it again?')
  cy.get('#popup_ok').click()
  //assertion to verify animal is selected
  cy.get('#txtCurrentWT').then(($input) => {
    expect($input.val()).to.not.be.empty;
  });

    })

    it('Fill the form to treat animal', () => {
        cy.get('#ddlDiagnosis').should('be.visible').select('Bloat')
        cy.get('#ddlTreatment').should('be.visible').select('Bloat')
        cy.get('#ddlTreatmentPerson').should('be.visible').select('Jeremy Fox')
        cy.get('#rbHospital').click()
        cy.get('#ddlToPen').should('be.visible').select('H100')
  });

  it('Save animal', () => {
    cy.get('#bttnTreatmentSave').should('be.visible').click()
    cy.get('#popup_message > .SucessMsg').should('contain', 'Animal Treatment has been saved successfully')
        cy.get('#popup_ok').click()
    })  
});

describe('Make animal as dead', () => {


    it('Select animal and verify Selected', () => {
        cy.reload()
        //Select Animal 
    cy.get('#txtAnimal')
    .focus()
    .type('SR021')
  //Random click to fetch data
  cy.get('.relative > .red').click()
  cy.wait(2000)
// assertion to verify animal is selected
  cy.get('#txtCurrentWT').then(($input) => {
    expect($input.val()).to.not.be.empty;
    })
    })

    
    it('Select Dead tab and Fill details', () => {
        cy.get('#Dead > .red').should('be.visible').click()
        cy.get('#ddlDeadReason').should('be.visible').select('Brainer')
        
  });

  it('Save animal and verify animal is dead', () => {
    cy.get('#bttnDeadSave').should('be.visible').click()
    cy.get('#popup_message > .SucessMsg').should('contain', 'Animal dead saved successfully')
        cy.get('#popup_ok').click()
    })  

   
});

describe('Make animal as Realized', () => {

    

    it('Select animal and verify Selected', () => {
        cy.reload()
        //Select Animal 
    cy.get('#txtAnimal')
    .focus()
    .type('SR031')
  //Random click to fetch data
  cy.get('.relative > .red').click()
  cy.wait(2000)
// assertion to verify animal is selected
  cy.get('#txtCurrentWT').then(($input) => {
    expect($input.val()).to.not.be.empty;
    })
    })

    
    it('Select Realize tab and Fill details', () => {
        cy.get('#Realize > .blue').should('be.visible').click()
        cy.get('#ddlRealizeReason').should('be.visible').select('Brainer')
        cy.get('#txtRealizePayWT').focus().clear().type('500')
        
  });

  it('Save animal and verify animal is Realized', () => {
    cy.get('#bttnRealizeSave').should('be.visible').click()
    cy.get('#popup_message > .SucessMsg').should('contain', 'Animal realizer saved successfully')
        cy.get('#popup_ok').click()
    })  

   
});