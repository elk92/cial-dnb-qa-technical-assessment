describe('Dropdown', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/dropdown')
  })

  it('should display the dropdown with the expected options', () => {
    cy.log('Validate dropdown availability')

    cy.get('#dropdown')
      .should('be.visible')
      .find('option')
      .should('have.length', 3)

    cy.get('#dropdown option')
      .eq(0)
      .should('have.text', 'Please select an option')

    cy.get('#dropdown option')
      .eq(1)
      .should('have.text', 'Option 1')

    cy.get('#dropdown option')
      .eq(2)
      .should('have.text', 'Option 2')
  })

  it('should allow selecting the available options', () => {
    cy.log('Select Option 1')

    cy.get('#dropdown')
      .select('Option 1')
      .should('have.value', '1')

    cy.log('Select Option 2')

    cy.get('#dropdown')
      .select('Option 2')
      .should('have.value', '2')
  })
})
