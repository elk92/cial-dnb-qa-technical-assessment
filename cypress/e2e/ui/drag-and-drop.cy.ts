describe('Drag and Drop', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/drag_and_drop')
  })

  it('should swap the columns when dragging column A to column B', () => {
    cy.log('Validate initial column state')

    cy.get('#column-a header').should('have.text', 'A')
    cy.get('#column-b header').should('have.text', 'B')

    cy.log('Drag column A to column B')

    cy.window().then((win) => {
      const dataTransfer = new win.DataTransfer()

      cy.get('#column-a').trigger('dragstart', { dataTransfer })
      cy.get('#column-b').trigger('dragenter', { dataTransfer })
      cy.get('#column-b').trigger('dragover', { dataTransfer })
      cy.get('#column-b').trigger('drop', { dataTransfer })
      cy.get('#column-a').trigger('dragend', { dataTransfer })
    })

    cy.log('Validate swapped column state')

    cy.get('#column-a header').should('have.text', 'B')
    cy.get('#column-b header').should('have.text', 'A')
  })
})
