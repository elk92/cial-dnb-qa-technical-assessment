interface DeviceData {
  year: number
  price: number
  'CPU model': string
  'Hard disk size': string
}

interface Device {
  id: string
  name: string
  data: DeviceData
}

describe('DELETE /objects/{id}', () => {
  it('should create and delete an object successfully', () => {
    const requestBody = {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
      },
    }

    cy.log('Create an object to be deleted')

    cy.request({
      method: 'POST',
      url: 'https://api.restful-api.dev/objects',
      body: requestBody,
    }).then((postResponse) => {
      expect(postResponse.status).to.eq(200)

      const createdDevice = postResponse.body as Device

      expect(createdDevice.id).to.be.a('string')
      expect(createdDevice.name).to.eq(requestBody.name)
      expect(createdDevice.data).to.deep.equal(requestBody.data)

      cy.log('Delete the created object')

      cy.request({
        method: 'DELETE',
        url: `https://api.restful-api.dev/objects/${createdDevice.id}`,
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200)

        cy.log('Validate object deletion')

        cy.request({
          method: 'GET',
          url: `https://api.restful-api.dev/objects/${createdDevice.id}`,
          failOnStatusCode: false,
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(404)
        })
      })
    })
  })
})
