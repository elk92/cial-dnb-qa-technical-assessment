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

describe('PATCH /objects/{id}', () => {
  it('should partially update a created object successfully', () => {
    const originalName = 'Apple MacBook Pro 16'
    const updatedName = 'Apple MacBook Pro 16 (Updated Name)'

    const requestBody = {
      name: originalName,
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
      },
    }

    cy.log('Create an object to be updated')

    cy.request({
      method: 'POST',
      url: 'https://api.restful-api.dev/objects',
      body: requestBody,
    }).then((postResponse) => {
      expect(postResponse.status).to.eq(200)

      const createdDevice = postResponse.body as Device

      expect(createdDevice.id).to.be.a('string')
      expect(createdDevice.name).to.eq(originalName)
      expect(createdDevice.data).to.deep.equal(requestBody.data)

      cy.log('Partially update the object name')

      cy.request({
        method: 'PATCH',
        url: `https://api.restful-api.dev/objects/${createdDevice.id}`,
        body: {
          name: updatedName,
        },
      }).then((patchResponse) => {
        expect(patchResponse.status).to.eq(200)

        const updatedDevice = patchResponse.body as Device

        expect(updatedDevice.id).to.eq(createdDevice.id)
        expect(updatedDevice.name).to.eq(updatedName)
        expect(updatedDevice.data).to.deep.equal(createdDevice.data)

        cy.log('Validate updated object persistence')

        cy.request(
          'GET',
          `https://api.restful-api.dev/objects/${createdDevice.id}`,
        ).then((getResponse) => {
          expect(getResponse.status).to.eq(200)

          const persistedDevice = getResponse.body as Device

          expect(persistedDevice.id).to.eq(createdDevice.id)
          expect(persistedDevice.name).to.eq(updatedName)
          expect(persistedDevice.data).to.deep.equal(createdDevice.data)
        })
      })
    })
  })
})
