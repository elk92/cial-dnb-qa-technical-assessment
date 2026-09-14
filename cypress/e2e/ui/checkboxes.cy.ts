describe('Checkboxes', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/checkboxes')
  })

  it('should display the checkboxes with the expected initial state', () => {
    cy.log('Validate checkbox initial state')

    cy.get('input[type="checkbox"]').should('have.length', 2)

    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
    cy.get('input[type="checkbox"]').eq(1).should('be.checked')
  })

  it('should allow checking and unchecking the checkboxes', () => {
    cy.log('Check the first checkbox')

    cy.get('input[type="checkbox"]').eq(0).check()
    cy.get('input[type="checkbox"]').eq(0).should('be.checked')

    cy.log('Uncheck the second checkbox')

    cy.get('input[type="checkbox"]').eq(1).uncheck()
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
  })
})
