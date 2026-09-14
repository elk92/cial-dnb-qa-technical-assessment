describe('Negative API scenarios', () => {
  it('should return 404 when requesting a nonexistent object', () => {
    const nonexistentId = '999999999'

    cy.log('Request a nonexistent object')

    cy.request({
      method: 'GET',
      url: `https://api.restful-api.dev/objects/${nonexistentId}`,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log('Validate nonexistent object response')

      expect(response.status).to.eq(404)
    })
  })

  it('should return 404 when updating a nonexistent object', () => {
    const nonexistentId = '999999999'

    cy.log('Attempt to update a nonexistent object')

    cy.request({
      method: 'PATCH',
      url: `https://api.restful-api.dev/objects/${nonexistentId}`,
      body: {
        name: 'Updated Name',
      },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log('Validate nonexistent object update response')

      expect(response.status).to.eq(404)
    })
  })

  it('should return 404 when deleting a nonexistent object', () => {
    const nonexistentId = '999999999'

    cy.log('Attempt to delete a nonexistent object')

    cy.request({
      method: 'DELETE',
      url: `https://api.restful-api.dev/objects/${nonexistentId}`,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log('Validate nonexistent object deletion response')

      expect(response.status).to.eq(404)
    })
  })
})
