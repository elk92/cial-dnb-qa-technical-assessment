interface Device {
  id: string
  name: string
}

describe('GET /objects by multiple IDs', () => {
  it('should return the requested objects successfully', () => {
    const requestedIds = ['3', '5', '10']

    cy.log('Request objects by multiple IDs')

    cy.request({
      method: 'GET',
      url: 'https://api.restful-api.dev/objects',
      qs: {
        id: requestedIds,
      },
    }).then((response) => {
      cy.log('Validate successful response')

      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body).to.have.length(requestedIds.length)

      cy.log('Validate returned object IDs')

      const devices = response.body as Device[]
      const returnedIds = devices.map((device) => device.id)

      expect(returnedIds).to.have.members(requestedIds)

      cy.log('Validate object structure')

      devices.forEach((device) => {
        expect(device).to.have.property('id').that.is.a('string')
        expect(device).to.have.property('name').that.is.a('string')
      })
    })
  })
})
