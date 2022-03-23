const { createDriverModel }= require('../lib/models')

module.exports.createAddDriver =  ({connection}) => {
  const driverRepo = createDriverModel(connection)
  const createAddDriver = addDriver.bind(null, driverRepo)
  return createAddDriver
}

async function addDriver (driverRepo, driver, callback) {
  const res = await driverRepo.create(driver)
  callback(null, res)
}
