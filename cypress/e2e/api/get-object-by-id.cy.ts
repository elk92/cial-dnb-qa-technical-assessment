interface Device {
  id: string
  name: string
  data?: Record<string, unknown>
}

describe('GET /objects/:id', () => {
  it('should return the requested object successfully', () => {
    const requestedId = '7'

    cy.log(`Request object with ID ${requestedId}`)

    cy.request({
      method: 'GET',
      url: `https://api.restful-api.dev/objects/${requestedId}`,
    }).then((response) => {
      cy.log('Validate successful response')

      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('object')

      cy.log('Validate returned object')

      const device = response.body as Device

      expect(device.id).to.eq(requestedId)
      expect(device).to.have.property('name').that.is.a('string')

      cy.log('Validate optional data structure')

      if (device.data !== undefined) {
        expect(device.data).to.be.an('object')
      }
    })
  })
})
