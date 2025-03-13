import { login } from '../../support/function.js';


describe('CATTLEXPERT COMPLETE SMOKE TESTING', () => {

    it('00 LOGIN TO CATTLEXPERT WEBSITE', () => {        
        // LOGIN
        login();
        })

it('01 DASHBOARD Navigation Dropdown Menu Smoke Testing', () => {    
//DASHBOARD
    //Cattle Board
    cy.get('#Item_JHS1').click()
    cy.get('#Item_JHS2').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Cattle Board' ).should('be.visible')
    //Feedyard Map
    cy.get('#Item_JHS1').click()
    cy.get('#Item_JHS3').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Feedyard Map').should('be.visible')
    //Home
    cy.get('#Item_JHS1').click()
    cy.get('#Item_JHS137').click()
    cy.contains('#fldset_Dashboard > legend','Dashboard').should('be.visible')
    })
  
it('02 PROCUREMENT Navigation Dropdown Menu Smoke Testing', () => {    
//PROCUREMENT
    //Buyer’s Projection
    cy.get('#Item_JHS4').click()
    cy.get('#Item_JHS5').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Buyer’s Projection').should('be.visible')
    //Cattle Contract
    cy.get('#Item_JHS4').click()
    cy.get('#Item_JHS6').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Cattle Contract').should('be.visible')
    //Cattle Receiving
    cy.get('#Item_JHS4').click()
    cy.get('#Item_JHS7').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Cattle Receiving').should('be.visible')
    //Feeder Bid Sheet
    cy.get('#Item_JHS4').click()
    cy.get('#Item_JHS8').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Feeder Bid Sheet').should('be.visible')
    //Projection/Closeout Worksheet
    cy.get('#Item_JHS4').click()
    cy.get('#Item_JHS9').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Projection/Closeout Worksheet').should('be.visible')
    })

it('03 COMMODITY Navigation Dropdown Menu Smoke Testing', () => { 
//COMMODITY
    //Commodity Contract/Scale Ticket
    cy.get('#Item_JHS10').click()
    cy.get('#Item_JHS11').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Commodity Contract/Scale Ticket').should('be.visible')
    //Guaranteed Price Setup
    cy.get('#Item_JHS10').click()
    cy.get('#Item_JHS14').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Guaranteed Price Setup').should('be.visible')
    //Physical Inventory
    cy.get('#Item_JHS10').click()
    cy.get('#Item_JHS15').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Physical Inventory').should('be.visible')
    //Receiving/Adjustments
    cy.get('#Item_JHS10').click()
    cy.get('#Item_JHS317').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Receiving/Adjustments').should('be.visible')
    //Scale Ticket Payment
    cy.get('#Item_JHS10').click()
    cy.get('#Item_JHS148').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Scale Ticket Payment').should('be.visible')
    })

it('04 PROCESSING Navigation Dropdown Menu Smoke Testing', () => {
//PROCESSING
    //Cattle Induction Processing
    cy.get('#Item_JHS16').click()
    cy.get('#Item_JHS17').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Cattle Induction Processing').should('be.visible')
    //Lot Details
    cy.get('#Item_JHS16').click()
    cy.get('#Item_JHS18').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Lot Details').should('be.visible')
    //Lot Merge
    cy.get('#Item_JHS16').click()
    cy.get('#Item_JHS139', {force: true}).click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Lot Merge').should('be.visible')
    //Lot Transfer
    cy.get('#Item_JHS16').click()
    cy.get('#Item_JHS141').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Lot Transfer').should('be.visible')
    //MoveXpert
    cy.get('#Item_JHS16').click()
    cy.get('#Item_JHS19').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','MoveXpert').should('be.visible')
    //Pen Details
    cy.get('#Item_JHS16').click()
    cy.get('#Item_JHS20').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Pen Details').should('be.visible')
    //Performance Sort
    cy.get('#Item_JHS16').click()
    cy.get('#Item_JHS21').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Performance Sort').should('be.visible')
    //Re-Processing
    cy.get('#Item_JHS16').click()
    cy.get('#Item_JHS22', {force: true}).click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Re-Processing').should('be.visible')
    })

it('05 FEED Navigation Dropdown Menu Smoke Testing', () => {
//FEED
    //Create Feed Loads
    cy.get('#Item_JHS23').click()
    cy.get('#Item_JHS24').click()
    cy.get('#ddlCreateLoads').should('be.visible')
    //Feed Call/Pen Consumption
    cy.get('#Item_JHS23').click()
    cy.get('#Item_JHS25').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Feed Call/Pen Consumption').should('be.visible')
    //Feed Status
    cy.wait(5000)
    cy.get('#Item_JHS23').click()
    cy.get('#Item_JHS26').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Feed Status').should('be.visible')
    //Manual Feed Edit
    cy.get('#Item_JHS23').click()
    cy.get('#Item_JHS28').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Manual Feed Edit').should('be.visible')
    })

it('06 HEALTH Navigation Dropdown Menu Smoke Testing', () => {
//HEALTH
    //Add Weight
    cy.get('#Item_JHS31').click()
    cy.get('#lnkAddWeight').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Add Weight').should('be.visible')
    //Animal Create
    cy.get('#Item_JHS31').click()
    cy.get('#Item_JHS32').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Animal Create').should('be.visible')
    //Animal Details
    cy.get('#Item_JHS31').click()
    cy.get('#lnkAnimalDetail').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Animal Details').should('be.visible')
    //Animal Import
    cy.get('#Item_JHS31').click()
    cy.get('#lnkAnimalImport').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Animal Import').should('be.visible')
    //Physical Inventory
    cy.get('#Item_JHS31').click()
    cy.get('#Item_JHS293').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Physical Inventory').should('be.visible')
    //Treat/Dead/Realize
    cy.get('#Item_JHS31').click()
    cy.get('#lnkAnimalTreatment').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Treat/Dead/Realize').should('be.visible')
    })

it('07 INVOICE Navigation Dropdown Menu Smoke Testing', () => {
//INVOICE
    //Apply Revenue
    cy.get('#Item_JHS36').click()
    cy.get('#Item_JHS37').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Apply Revenue').should('be.visible')
    //Charge Entry
    cy.get('#Item_JHS36').click()
    cy.get('#Item_JHS38').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Charge Entry').should('be.visible')
    //Charge Transfer
    cy.get('#Item_JHS36').click()
    cy.get('#Item_JHS145').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Charge Transfer').should('be.visible')
    //Invoice Processing
    cy.get('#Item_JHS36').click()
    cy.get('#Item_JHS40').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Invoice Processing').should('be.visible')
    //Lot Finance
    cy.get('#Item_JHS36').click()
    cy.get('#Item_JHS142').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Lot Finance').should('be.visible')
    //Lot Markup
    cy.get('#Item_JHS36').click()
    cy.get('#Item_JHS143').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Lot Markup').should('be.visible')
    })

it('08 SALES Navigation Dropdown Menu Smoke Testing', () => {
//SALES
    //Cattle Sales
    cy.get('#Item_JHS41').click()
    cy.get('#Item_JHS42').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Cattle Sales').should('be.visible')
    //Realizer Sale Worksheet
    cy.get('#Item_JHS41').click()
    cy.get('#Item_JHS43').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Realizer Sale Worksheet').should('be.visible')
    //Show List Worksheet
    cy.get('#Item_JHS41').click()
    cy.get('#Item_JHS341').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Show List Worksheet').should('be.visible')
    })

it('09 DAILY JOBS Navigation Dropdown Menu Smoke Testing', () => {
//DAILY JOBS    
    //All Jobs
    cy.get('#Item_JHS45').click()
    cy.get('#lnkAllJobs').then(newTab => {
        const hrefTab = newTab.prop('href')
        cy.visit(hrefTab)})
    cy.contains('#formcontainer > h1 > span:nth-child(2)','All Jobs').should('be.visible')
    //Job Status
    cy.visit('https://clientdemos.cattlexpert.com/Cattlexpert.UI/ShowList.aspx#lnkShowList')
    cy.get('#Item_JHS45').click()
    cy.get('#lnkJobStatus').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Job Status').should('be.visible')
    })


})