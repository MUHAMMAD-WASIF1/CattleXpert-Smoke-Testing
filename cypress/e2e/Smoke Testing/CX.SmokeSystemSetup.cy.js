import { login } from '../../support/function.js';


describe('CATTLEXPERT COMPLETE "SYSTEM SETUP" SMOKE TESTING', () => {

it('00 LOGIN TO CATTLEXPERT WEBSITE', () => {        
    // LOGIN
    login();
    })

it('01 SYSTEM SETUP > CATTLE Smoke Testing', () => {     
//SYSTEM SETUP

//CATTLE
    //Breed
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS49').click()
    cy.get('#Item_JHS50').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Breed').should('be.visible')
    //Cattle Base Weight
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS49').click()
    cy.get('#Item_JHS52').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Cattle Base Weight').should('be.visible')
    //Countries/States
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS49').click()
    cy.get('#Item_JHS314').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Countries/States').should('be.visible')   
    //Estimated Average Daily Gain
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS49').click()
    cy.get('#Item_JHS53').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Estimated Average Daily Gain').should('be.visible')
    //Flesh
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS49').click()
    cy.get('#Item_JHS54').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Flesh').should('be.visible')
    //Gender
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS49').click()
    cy.get('#Item_JHS55').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Gender').should('be.visible')
    //Places
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS49').click()
    cy.get('#Item_JHS56').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Places').should('be.visible')
    //Projection Defaults
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS49').click()
    cy.get('#Item_JHS57').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Projection Defaults').should('be.visible')
    //Seasonal ADG
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS49').click()
    cy.get('#Item_JHS58').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Seasonal ADG').should('be.visible')   
    //Weight Class
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS49').click()
    cy.get('#Item_JHS313').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Weight Class').should('be.visible')
    })
    
it('02 SYSTEM SETUP > COMPANY Smoke Testing', () => {
//COMPANY
    //Accounting
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS59').click()
    cy.get('#Item_JHS60').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Accounting').should('be.visible')
    //Animal Tracking
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS59').click()
    cy.get('#Item_JHS61').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Animal Tracking').should('be.visible')
    //Benchmarking
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS59').click()
    cy.get('#Item_JHS62').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Benchmarking').should('be.visible')
    //Breeding
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS59').click()
    cy.get('#Item_JHS63').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Breeding').should('be.visible')
    //Company Info
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS59').click()
    cy.get('#Item_JHS64').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Company Info').should('be.visible')   
    //General Information
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS59').click()
    cy.get('#Item_JHS65').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','General Information').should('be.visible')
    //Licensing
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS59').click()
    cy.get('#Item_JHS66').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Licensing').should('be.visible')
    //Metric
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS59').click()
    cy.get('#Item_JHS67').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Metric').should('be.visible')
    //Multiple Feedyards
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS59').click()
    cy.get('#Item_JHS68').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Multiple Feedyards').should('be.visible')
    //Processing
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS59').click()
    cy.get('#Item_JHS69').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Processing').should('be.visible')
    //User Defined Fields
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS59').click()
    cy.get('#Item_JHS70').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','User Defined Fields').should('be.visible')   
    })

it('03 SYSTEM SETUP > CUSTOM REPORTS Smoke Testing', () => {
//CUSTOM REPORTS
    //Custom Reports
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS71').click()
    cy.get('#Item_JHS72').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Custom Reports').should('be.visible')
    //Edit Reports
    // cy.get('#Item_JHS48').click()
    // cy.get('#Item_JHS71').click()
    // cy.get('#Item_JHS73').click()
    // cy.contains('#formcontainer > h1 > span:nth-child(2)','').should('be.visible')
    })

it('04 SYSTEM SETUP > DATA EXPORTS Smoke Testing', () => {
//DATA EXPORTS
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS74').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Data Export').should('be.visible')
    })

it('05 SYSTEM SETUP > FEED Smoke Testing', () => {
//FEED
    //Bunk Read Codes
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS77').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Bunk Read Codes').should('be.visible')
    //Commodity
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS78').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Commodity').should('be.visible')
    //Commodity Component
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS138').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Commodity Component').should('be.visible')   
    //Commodity Cost
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS79').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Commodity Cost').should('be.visible')
    //Commodity Discount
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS80').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Commodity Discount').should('be.visible')
    //Commodity Dry Matter
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS81').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Commodity Dry Matter').should('be.visible')
    //Default Ration Schedule
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS82').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Default Ration Schedule').should('be.visible')
    //Discount Scale
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS83').click()
    cy.contains('#htmlCode > .curvetop > span[lang="en"]','Discount Scale').should('be.visible')
    //Feed Call Weight Groups
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS84').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Feed Call Weight Groups').should('be.visible')   
    //Feed Routes
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS85').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Feed Routes').should('be.visible')
    //Feed Truck
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS86').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Feed Truck').should('be.visible')
    //FeedXpert
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS87').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','FeedXpert').should('be.visible')
    //Pen Ration Schedule
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS88').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Pen Ration Schedule').should('be.visible')
    //Ration Worksheet
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS89').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Ration Worksheet').should('be.visible')
    //Truck Ration Capacity
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS90').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Truck Ration Capacity').should('be.visible')
    //Truck Type
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS76').click()
    cy.get('#Item_JHS91').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Truck Type').should('be.visible')
    })

it('06 SYSTEM SETUP > FEEDYARD MAP Smoke Testing', () => {
//FEEDYARD MAP
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS75').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Feedyard Map').should('be.visible')
    })

it('07 SYSTEM SETUP > HEALTH Smoke Testing', () => {
//HEALTH
    //Breeding Maintenance
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click({force: true})
    cy.get('#Item_JHS93').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Breeding Maintenance').should('be.visible')   
    //Diagnosis/Dead Medical Reason
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS94').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Diagnosis/Dead Medical Reason').should('be.visible')
    //Health Setup
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS95').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Health Setup').should('be.visible')
    //Implants
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS96').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Implants').should('be.visible')
    //Lung Score
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS97').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Lung Score').should('be.visible')
    //Medical Item Charge Categories
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS98').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Medical Item Charge Categories').should('be.visible')
    //Medical Item Container
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS99').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Medical Item Container').should('be.visible')   
    //Medical Items
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS100').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Medical Items').should('be.visible')
    //Predefined Treatments
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS101').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Predefined Treatments').should('be.visible')
    //Processing Regimen
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS102').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Processing Regimen').should('be.visible')
    //Rider/Treatment Person
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS103').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Rider/Treatment Person').should('be.visible')
    //Risk
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS104').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Risk').should('be.visible')
    //Severity
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS105').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Severity').should('be.visible')
    //Treatment Location
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS92').click()
    cy.get('#Item_JHS149').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Treatment Location').should('be.visible')
    })

it('08 SYSTEM SETUP > HOT STARS Smoke Testing', () => {
//HOT STARS
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS106').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Hot Stars').should('be.visible')
    })

it('09 SYSTEM SETUP > INVENTORY VALUATION Smoke Testing', () => {
//INVENTORY VALUATION
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS107').click()
    cy.get('#Item_JHS109').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Commodity').should('be.visible')  
    })

it('10 SYSTEM SETUP > INVOICE Smoke Testing', () => {
//INVOICE
    //Charge Type
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS110').click()
    cy.get('#Item_JHS39').click()
    cy.contains('#ChargeTypeFormView > .curvetop > span[lang="en"]','Charge Type').should('be.visible')
    //Finance
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS110').click()
    cy.get('#Item_JHS111').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Finance').should('be.visible')
    //Market Valuation
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS110').click()
    cy.get('#Item_JHS144').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Market Valuation').should('be.visible')
    //Owner Type
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS110').click()
    cy.get('#Item_JHS112').click()
    cy.contains('#secOwnerType > .curvetop > span[lang="en"]','Owner Type').should('be.visible')
    //Pen Class
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS110').click()
    cy.get('#Item_JHS113').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Pen Class').should('be.visible')
    //Ration Markup
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS110').click()
    cy.get('#Item_JHS114').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Ration Markup').should('be.visible')   
    //Special Service
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS110').click()
    cy.get('#Item_JHS115').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Special Service').should('be.visible')
    //Special Service Category
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS110').click()
    cy.get('#Item_JHS116').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Special Service Category').should('be.visible')
    //Yardage Fee
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS110').click()
    cy.get('#Item_JHS117').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Yardage Fee').should('be.visible')
    })

it('11 SYSTEM SETUP > LANGUAGE IMPORT Smoke Testing', () => {
//LANGUAGE IMPORT
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS152').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Language Import').should('be.visible')
    })

it('12 SYSTEM SETUP > LOCATIONS Smoke Testing', () => {
//LOCATIONS    
    //Locations
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS118').click()
    cy.get('#Item_JHS119').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Locations').should('be.visible')
    //Physical Pen
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS118').click()
    cy.get('#Item_JHS120').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Physical Pen').should('be.visible')
    })

it('13 SYSTEM SETUP > NEW LOT Smoke Testing', () => {
//NEW LOT
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS121').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','New Lot').should('be.visible')
    })

it('14 SYSTEM SETUP > PROCUREMENT Smoke Testing', () => {
//PROCUREMENT
    //Lot Class
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS122').click()
    cy.get('#Item_JHS315').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Lot Class').should('be.visible')
    //Prior Feed
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS122').click()
    cy.get('#Item_JHS123').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Prior Feed').should('be.visible')   
    //Program
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS122').click()
    cy.get('#Item_JHS124').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Program').should('be.visible')
    })

it('15 SYSTEM SETUP > PROFILE Smoke Testing', () => {
//PROFILE
    //Buyer
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS125').click()
    cy.get('#Item_JHS126').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Profile Info').should('be.visible')
    //Carrier
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS125').click()
    cy.get('#Item_JHS127').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Profile Info').should('be.visible')
    //Consultant
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS125').click()
    cy.get('#Item_JHS128').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Profile Info').should('be.visible')
    //Customer
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS125').click()
    cy.get('#Item_JHS129').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Profile Info').should('be.visible')
    //Owner
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS125').click()
    cy.get('#Item_JHS130').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Profile Info').should('be.visible')   
    //PArtnership
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS125').click()
    cy.get('#Item_JHS292').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Partnerships').should('be.visible')
    //Vendor
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS125').click()
    cy.get('#Item_JHS132').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Profile Info').should('be.visible')
    })

it('16 SYSTEM SETUP > SECURITY SETUP Smoke Testing', () => {
//SECURITY SETUP    
    //Group
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS133').click()
    cy.get('#Item_JHS134').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Group').should('be.visible')
    //Transaction Log
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS133').click()
    cy.get('#Item_JHS318').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Transaction Log').should('be.visible')
    //User
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS133').click()
    cy.get('#Item_JHS135').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','User').should('be.visible')
    })

it('17 SYSTEM SETUP > WORKSTATION SETUP Smoke Testing', () => {
//WORKSTATION SETUP
    cy.get('#Item_JHS48').click()
    cy.get('#Item_JHS136').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Workstation Setup').should('be.visible')
    })


})