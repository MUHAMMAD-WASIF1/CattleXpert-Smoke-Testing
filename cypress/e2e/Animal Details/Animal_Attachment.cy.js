import { login } from '../../support/function.js';

describe('LOGIN TO CATTLEXPERT WEBSITE', () => {

    it('LOGIN TO CATTLEXPERT WEBSITE', () => {
        // LOGIN
        login();
    })
})

describe('NAVIGATION TO HEALTH > Animal Details', () => {

    it('NAVIGATION TO HEALTH > Animal Details', () => {
        //Animal Details
        cy.get('#Item_JHS31').click()
        cy.get('#lnkAnimalDetail').click()

    })
    it('verify the presence of form Header', () => {
        cy.contains('#formcontainer > h1 > span:nth-child(2)', 'Animal Details').should('be.visible')
    })
})

describe('Navigating to Attachment Tab, ', () => {

    it('Select Animal ID and Attachment Tab', () => {

        //Select Animal 
        cy.get('#txtAnimal')
            .focus()
            .type('WASAUTO-T')
        //Random click to fetch data
        cy.get(':nth-child(1) > .red > span').click()
        cy.wait(2000)
        cy.get('#AnimalLiveStatus').should('be.visible').and('have.text', 'Active')
        cy.contains('#Attachment > a', 'Attachment').should('be.visible').click()
    })
})

describe('Upload an image in Attachment Tab And Verify', () => {

    it('Uploading an image', () => {

    cy.get('#btnAImportImage').should('be.visible').click()

      cy.uploadFileToIframe('#upload_form', '#pxupload1 > div > span.ui-button-text > input', 'cypress/fixtures/myImage.png');

    // Assertions about the UI after successful upload
    cy.iframe('#upload_form').then(($iframe) => {
    cy.wrap($iframe).find('#pxupload1_text').should('be.visible');
    cy.wrap($iframe).find('#px-submit').should('be.visible').click()
    cy.wait(2000)
    cy.wrap($iframe).find('#btn-done').should('be.visible').click()

    });
    })
    it('Verify image is uploaded', () => {
    // Add assertions or additional actions here to verify the upload was successful
    cy.get('#popup_message > .SucessMsg').should('contain', 'Brand image has been uploaded successfully')
    cy.get('#popup_ok').click()
    cy.get('#BrandImg > img').should('be.visible')
    
    })
})

describe('Delete Uploaded image in Attachment Tab And Verify', () => {

    it('Delete image', () => {

        cy.get('#btnADeleteImage').should('be.visible').click()
    
    })
    it('Verify image is deleted', () => {
    
    cy.get('#popup_message > .SucessMsg').should('contain', 'Brand Image has been deleted successfully')
    cy.get('#popup_ok').click()
    
    })
})

///////////////////////////////////////////////////////////////

describe('Upload a Document in Attachment Tab And Verify', () => {

    it('Uploading a Document', () => {

        cy.get('#btnAAddDocuments').should('be.visible').click()

      cy.uploadFileToIframe('#upload_form', '#pxupload1 > div > span.ui-button-text > input', 'cypress/fixtures/DataLoadImportTemplate1.xlsx');

    // Assertions about the UI after successful upload
    cy.iframe('#upload_form').then(($iframe) => {
    cy.wrap($iframe).find('#pxupload1_text').should('be.visible');
    cy.wrap($iframe).find('#px-submit').should('be.visible').click()
    cy.wait(2000)
    cy.wrap($iframe).find('#btn-done').should('be.visible').click()

    });

}
)
    it('Verify Document is uploaded', () => {
    // Add assertions or additional actions here to verify the upload was successful
    cy.get('#popup_message > .SucessMsg').should('contain', 'Document has been uploaded successfully')
    cy.get('#popup_ok').click()
    cy.get('[aria-describedby="AttachmentGridView_FILE_PATH"]').should('be.visible')
    
    })
})
// Already a record available with these details in deleted mode.   Please contact CX Admin.  

describe('Delete Uploaded Document And Verify', () => {

    it('Delete Document', () => {

        cy.get('[aria-describedby="AttachmentGridView_FILE_PATH"]').should('be.visible').click()
        cy.get('#btnADeleteDocuments').should('be.visible').click()
    
    })
    it('Verify Document is deleted', () => {
    
    cy.get('#popup_message > .SucessMsg').should('contain', 'Documents has been deleted successfully')
    cy.get('#popup_ok').click()
    
    })
})