module.exports.createAddDriver =  ({driverRepo, log}) => {
  const createAddDriver = addDriver.bind(null, driverRepo, log)
  return createAddDriver
}

module.exports.createUpdateDriver =  ({driverRepo, log}) => {
  const createUpdateDriver = updateDriver.bind(null, driverRepo, log)
  return createUpdateDriver
}


async function addDriver (driverRepo, log, driver, callback) {
  log.info({driver}, 'adding driver')
  const res = await driverRepo.create(driver)
  log.info({driver}, 'driver added')
  callback(null, res)
}

async function updateDriver (driverRepo, log, driver, callback) {
  log.info({driver}, 'updating driver')
  const res = await driverRepo.update(driver, {
    where: {
      id: driver.id
    }
  });
  log.info({res}, 'driver updated')
  callback(null, res)
}
