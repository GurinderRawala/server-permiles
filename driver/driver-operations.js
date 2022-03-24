module.exports.createAddDriver =  ({driverRepo}) => {
  const createAddDriver = addDriver.bind(null, driverRepo)
  return createAddDriver
}

async function addDriver (driverRepo, driver, callback) {
  const res = await driverRepo.create(driver)
  callback(null, res)
}
