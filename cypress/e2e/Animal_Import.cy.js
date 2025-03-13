import { getRandomNumbers, login } from '../support/function.js';

// Generate a random string
const randomNumbers = getRandomNumbers(3);

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        login();
    })
})

describe('NAVIGATION TO HEALTH > Animal Import', () => {

    it('NAVIGATION TO HEALTH > Animal Import', () => {
    //Animal Import
    cy.get('#Item_JHS31').click()
    cy.get('#lnkAnimalImport').click()

    })
    it('Verify the presence of form Header', () => {
        cy.contains('#formcontainer > h1 > span:nth-child(2)','Animal Import').should('be.visible')
    })
})

describe('Download document TEMPLATE Animal Genral Tab', () => {

    it('Download document TEMPLATE', () => {

        cy.get('#btnDownLoadTemplate > span').should('be.visible').click()
        cy.wait(5000)

    })

})

describe('Upload document in Animal Genral Tab And Verify', () => {

    it('Uploading document', () => {

    cy.get('#btnBrowse').should('be.visible').click()

      cy.uploadFileToIframe('#upload_form', '#pxupload1 > div > span.ui-button-text > input', 'cypress/fixtures/DataLoadImportTemplate2.xlsx');

 // Add assertions or additional actions here to verify the upload was successful
 cy.get('#popup_message > .SucessMsg').should('contain', 'Import Excel Successfull')
 cy.get('#popup_ok').click()
 cy.wait(5000)

    })

    it('Save animal details from Uploaded file', () => {

    cy.get('#btnAnimalSaveDataLoad').click()
    cy.get('#popup_message > .SucessMsg').should('contain', 'Import Animal General Data has been saved successfully')
    cy.get('#popup_ok').click()

    cy.get('#btnLoadTables').click()
    cy.get('#popup_message').should('contain', "Animal Detail's already exists")
    cy.get('#popup_ok').click()

    })
})

describe('Verify Document is Uploaded', () => {

    it('NAVIGATION TO HEALTH > Animal Details', () => {
        //Animal Details
        cy.get('#Item_JHS31').click()
        cy.get('#lnkAnimalDetail').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Animal Details').should('be.visible')
      })


    it('Select Animal Details from uploaded file', () => {
      //Select Animal 
      cy.get('#txtAnimal')
        .focus()
        .type('1212-1')
      //Random click to fetch data
      cy.get(':nth-child(1) > .red > span').click()
      cy.wait(2000)
      cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')

    })
})

//ANIMAL WEIGHTS TAB
describe('ANIMAL WEIGHTS TAB by Manual Entry', () => {

    it('NAVIGATION TO HEALTH > Animal Import > ANIMAL WEIGHTS TAB', () => {
        //Animal Import
        cy.get('#Item_JHS31').click()
        cy.get('#lnkAnimalImport').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Animal Import').should('be.visible')
    })

    it('Click ANIMAL WEIGHTS TAB', () => {
        cy.contains('#Weight > a', 'Animal Weight Details').should('be.visible').click()
    })
})

describe('Add Data in grid', () => {

    it('Add Data in grid', () => {
        cy.get('[aria-describedby="animalWeightGridView_AnimalID"] > #txtAnimalID').should('be.visible').focus().clear().type('1212-8')
        cy.get('#txtWeight').should('be.visible').focus().clear().type(randomNumbers)
        cy.get('#txtMarginalGain').should('be.visible').focus().clear().type('35.00')
        cy.get('#txtTotalGain').should('be.visible').focus().clear().type('100')
        cy.get('#txtAction').should('be.visible').focus().clear().type('Test')
    })

    it('SAve and load data in table', () => {
        cy.get('.weightSaveBtn').click()
        cy.get('#popup_message').should('contain', "Import Animal Breeding Data has been saved successfully")
        cy.get('#popup_ok').click()

        cy.get('#btnLoadTables').click()
        cy.get('#popup_message').should('be.visible')
        // .should('contain', "Animal Detail's already exists")
        cy.get('#popup_ok').click()
    })

})

describe('Verify data is saved and loaded', () => {

    it('NAVIGATION TO HEALTH > Animal Details', () => {
        //Animal Details
        cy.get('#Item_JHS31').click()
        cy.get('#lnkAnimalDetail').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Animal Details').should('be.visible')
    })


    it('Select Animal Details from uploaded file', () => {
        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('1212-8')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')

        // Select weight tab
        cy.contains('#tab_Weight', 'Weights').should('be.visible').click();
        cy.wait(2000)
        cy.get('[aria-describedby="LoadAnimalWeightGridView_WGHT"]')
            .should('be.visible')
            .and('contain', randomNumbers);
    })
    it('Delete Animal Weight', () => {
        cy.get('[aria-describedby="LoadAnimalWeightGridView_WGHT"]')
            .should('be.visible')
            .and('contain', randomNumbers).click()
        cy.get('#lnkDeleteWeight').click()
        cy.get('#popup_ok').click()
        cy.contains('#popup_message', 'Animal Weight has been deleted successfully')
        cy.get('#popup_ok').click()
    })
})

//Animal Import With excel file

describe('ANIMAL WEIGHTS TAB with EXCEL upload', () => {

    it('NAVIGATION TO HEALTH > Animal Import > ANIMAL WEIGHTS TAB', () => {
    //Animal Import
    cy.get('#Item_JHS31').click()
    cy.get('#lnkAnimalImport').click()
    cy.contains('#formcontainer > h1 > span:nth-child(2)','Animal Import').should('be.visible')
    })
   
    it('Click ANIMAL WEIGHTS TAB', () => {
     cy.contains('#Weight > a', 'Animal Weight Details').should('be.visible').click()
    })
})

describe('Download document TEMPLATE Animal Import > ANIMAL WEIGHTS TAB', () => {

    it('Download document TEMPLATE', () => {

        cy.get('#btnDownLoadTemplate > span').should('be.visible').click()
        cy.wait(5000)

    })

})

describe('Upload document in  ANIMAL WEIGHTS TAB And Verify', () => {

    it('Uploading document', () => {

        cy.get('#btnBrowseWeight').should('be.visible').click()

      cy.uploadFileToIframe('#upload_form', '#pxupload1 > div > span.ui-button-text > input', 'cypress/fixtures/DataLoadImportTemplate2.xlsx');


// Add assertions or additional actions here to verify the upload was successful
cy.get('#popup_message > .SucessMsg').should('contain', 'Import Excel Successfull')
cy.get('#popup_ok').click()
cy.wait(5000)

    })

    it('Save ANIMAL WEIGHTS TAB details from Uploaded file', () => {

    cy.get('#btnLoadTables').click()
    cy.get('#popup_message').should('be.visible')
    // .should('contain', "Animal Detail's already exists")
    cy.get('#popup_ok').click()

    })
})

describe('Verify Document is Uploaded', () => {

    it('NAVIGATION TO HEALTH > Animal Details', () => {
        //Animal Details
        cy.get('#Item_JHS31').click()
        cy.get('#lnkAnimalDetail').click()
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Animal Details').should('be.visible')
      })


    it('Select Animal Details from uploaded file', () => {
      //Select Animal 
      cy.get('#txtAnimal')
        .focus()
        .type('1212-1')
      //Random click to fetch data
      cy.get(':nth-child(1) > .red > span').click()
      cy.wait(2000)
      cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')

    //  Select weight tab
        cy.contains('#tab_Weight', 'Weights').should('be.visible').click();
        cy.wait(2000)
        cy.get('[aria-describedby="LoadAnimalWeightGridView_WGHT"]')
            .should('be.visible')
            .and('contain', '600');
    })

    it('Delete Animal Weight', () => {
        cy.get('[aria-describedby="LoadAnimalWeightGridView_WGHT"]')
            .should('be.visible')
            .and('contain', '600').click()
        cy.get('#lnkDeleteWeight').click()
        cy.get('#popup_ok').click()
        cy.contains('#popup_message', 'Animal Weight has been deleted successfully')

    })
    
})