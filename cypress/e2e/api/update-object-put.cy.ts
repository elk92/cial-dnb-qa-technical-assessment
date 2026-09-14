interface DeviceData {
  year: number
  price: number
  'CPU model': string
  'Hard disk size': string
  color: string
}

interface Device {
  id: string
  name: string
  data: DeviceData
}

describe('PUT /objects/{id}', () => {
  it('should replace the object successfully', () => {
    const createBody = {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
      },
    }

    const updateBody = {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
        color: 'silver',
      },
    }

    cy.log('Create an object to be replaced')

    cy.request({
      method: 'POST',
      url: 'https://api.restful-api.dev/objects',
      body: createBody,
    }).then((postResponse) => {
      expect(postResponse.status).to.eq(200)

      const createdDevice = postResponse.body as Device

      expect(createdDevice.id).to.be.a('string')

      cy.log('Replace the object with the complete representation')

      cy.request({
        method: 'PUT',
        url: `https://api.restful-api.dev/objects/${createdDevice.id}`,
        body: updateBody,
      }).then((putResponse) => {
        expect(putResponse.status).to.eq(200)

        const updatedDevice = putResponse.body as Device

        expect(updatedDevice.id).to.eq(createdDevice.id)
        expect(updatedDevice.name).to.eq(updateBody.name)
        expect(updatedDevice.data).to.deep.equal(updateBody.data)

        cy.log('Validate replaced object persistence')

        cy.request(
          'GET',
          `https://api.restful-api.dev/objects/${createdDevice.id}`,
        ).then((getResponse) => {
          expect(getResponse.status).to.eq(200)

          const persistedDevice = getResponse.body as Device

          expect(persistedDevice.id).to.eq(createdDevice.id)
          expect(persistedDevice.name).to.eq(updateBody.name)
          expect(persistedDevice.data).to.deep.equal(updateBody.data)
        })
      })
    })
  })
})
