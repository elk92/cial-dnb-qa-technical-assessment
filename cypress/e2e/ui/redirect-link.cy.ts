describe('Redirect Link', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/redirector')
  })

  it('should redirect to the status codes page', () => {
    cy.log('Validate redirect link')

    cy.get('#redirect')
      .should('be.visible')
      .and('have.attr', 'href', 'redirect')
      .and('contain.text', 'here')

    cy.log('Click the redirect link')

    cy.get('#redirect').click()

    cy.log('Validate redirect destination')

    cy.url().should('include', '/status_codes')

    cy.log('Validate status codes page')

    cy.get('h3')
      .should('be.visible')
      .and('have.text', 'Status Codes')
  })
})
