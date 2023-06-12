const assert = require('assert')

class Driver {
  constructor(id) {
    this.id = id
  }

  static fromData(data) {
    assert(typeof data === 'object', 'driver fromData: invalid object')
    const driver = new Driver(data.id)
    driver.firstname = data.firstname
    driver.lastname = data.lastname
    driver.driver_id = data.driver_id
    driver.email = data.email
    driver.password = data.password
    driver.phone = data.phone
    driver.address = data.address
    driver.drivers_licence = data.drivers_licence
    driver.licence_state = data.licence_state
    driver.truckno = data.truckno
    driver.awaitingSignup = data.awaitingSignup
    driver.filepath = data.filepath
    driver.reg_date = data.reg_date
    driver.clientid = data.clientid
    driver.token = data.token
    return driver
  }

  static async createInviteDriver(
    data,
    files,
    { clock, uploadService, token }
  ) {
    let uploadResponse = null
    if (files) {
      uploadResponse = await uploadService(files, data.id, (err, results) => {
        if (err) {
          throw new Error(err)
        }
        return results
      })
    }
    const inviteDriver = {
      ...data,
      password: 'NEWPASSWORD',
      awaitingSignup: true,
      filepath: uploadResponse,
      address: this.createAddress(data),
      createdAt: clock(),
      token: token.create(
        {
          id: data.id,
          clientid: data.clientid,
          email: data.email,
        },
        {
          expiresIn: '48h',
        }
      ),
    }
    return this.fromData(inviteDriver)
  }

  static async createActiveDriverAccount(data, { hashingService, log }) {
    const hash = await hashingService.hash(data.password, (err, results) => {
      if (err) {
        throw new Error(err)
      }
      return results
    })
    log.info('password hashed')
    return {
      ...data,
      password: hash,
      awaitingSignup: false,
    }
  }

  static createAddress(data) {
    return [
      {
        street: data.street,
        city: data.city,
        state: data.state,
        postal: data.postal,
        country: data.country,
      },
    ]
  }
}
module.exports = { Driver }
