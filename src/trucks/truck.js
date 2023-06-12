const assert = require('assert')
class Truck {
  constructor(id) {
    this.id = id
  }
  static fromData(data) {
    assert(typeof data === 'object', 'truck fromData: invalid object')
    const truck = new Truck(data.id)
    truck.clientid = data.clientid
    truck.model = data.model
    truck.make = data.make
    truck.year = data.year
    truck.truckNo = data.truckNo
    truck.vinNumber = data.vinNumber
    truck.licencePlate = data.licencePlate
    truck.licenceState = data.licenceState
    truck.safetyExpire = data.safetyExpire
    truck.notes = data.notes
    truck.filepath = data.filepath
    return truck
  }
  static async uploadTruckFiles(data, files, { uploadService }) {
    let filepath = null
    if (files) {
      filepath = await uploadService(files, data.id, (err, results) => {
        if (err) {
          throw new Error(err)
        }
        return results
      })
    }
    const payload = {
      ...data,
      filepath,
    }
    return this.fromData(payload)
  }
}

module.exports = { Truck }
