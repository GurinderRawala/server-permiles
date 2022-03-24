module.exports.createAddDriver =  ({driverRepo, log}) => {
  const createAddDriver = addDriver.bind(null, driverRepo, log)
  return createAddDriver
}

async function addDriver (driverRepo, log, driver, callback) {
  log.info({driver}, 'adding driver')
  const res = await driverRepo.create(driver)
  log.info({driver}, 'driver added')
  callback(null, res)
}
