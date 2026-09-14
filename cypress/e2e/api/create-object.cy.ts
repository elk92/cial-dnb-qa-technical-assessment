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

describe('POST /objects', () => {
  it('should create a new object successfully', () => {
    const requestBody = {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
      },
    }

    cy.log('Create a new object')

    cy.request({
      method: 'POST',
      url: 'https://api.restful-api.dev/objects',
      body: requestBody,
    }).then((response) => {
      cy.log('Validate creation response')

      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')

      const createdDevice = response.body as Device

      expect(createdDevice.id).to.be.a('string')
      expect(createdDevice.name).to.eq(requestBody.name)
      expect(createdDevice.data).to.deep.equal(requestBody.data)

      cy.log('Validate created object persistence')

      cy.request(
        `https://api.restful-api.dev/objects/${createdDevice.id}`,
      ).then((getResponse) => {
        expect(getResponse.status).to.eq(200)

        const persistedDevice = getResponse.body as Device

        expect(persistedDevice.id).to.eq(createdDevice.id)
        expect(persistedDevice.name).to.eq(requestBody.name)
        expect(persistedDevice.data).to.deep.equal(requestBody.data)
      })
    })
  })
})
