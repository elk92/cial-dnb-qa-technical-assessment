interface Device {
  id: string
  name: string
}

describe('GET /objects', () => {
  it('should return the list of objects successfully', () => {
    cy.log('Request the list of objects')

    cy.request('https://api.restful-api.dev/objects')
      .then((response) => {
        cy.log('Validate successful response')

        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)

        cy.log('Validate object structure')

        ;(response.body as Device[]).forEach((object) => {
          expect(object).to.have.property('id')
          expect(object).to.have.property('name')
        })
      })
  })
})
