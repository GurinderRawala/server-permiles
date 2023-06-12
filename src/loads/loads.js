const assert = require('assert')
class Load {
  constructor(id) {
    this.id = id
  }
  static formData(data) {
    assert(typeof data === 'object', 'load fromData: invalid object')
    const load = new Load(data.id)
    load.clientid = data.clientid
    load.brokerId = data.brokerId
    load.state = data.state
    load.shipper = data.shipper
    load.receiver = data.receiver
    load.hazmat = data.hazmat
    load.poNumber = data.poNumber
    load.trailerNo = data?.trailerNo || null
    load.commodity = data?.commodity || null
    load.totalWeight = data?.totalWeight || null
    load.filepath = data?.filepath || null
    return load
  }
  static async createAddLoad(data, files, { uploadService }) {
    let uploadResponse = null
    if (files?.length) {
      uploadResponse = await uploadService(
        files,
        [data.clientid, 'load'].join('/'),
        (err, results) => {
          if (err) {
            throw new Error(err)
          }
          return results
        }
      )
    }
    const load = {
      ...data,
      filepath: uploadResponse,
    }
    return this.formData(load)
  }
}

module.exports = { Load }
