describe('File Upload', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/upload')
  })

  it('should upload a file successfully', () => {
    cy.log('Select the test file')

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/test-upload.txt')

    cy.get('#file-upload')
      .should('have.value', 'C:\\fakepath\\test-upload.txt')

    cy.log('Submit the file upload')

    cy.get('#file-submit').click()

    cy.log('Validate successful file upload')

    cy.get('h3').should('have.text', 'File Uploaded!')
    cy.get('#uploaded-files').should('contain.text', 'test-upload.txt')
  })
})
