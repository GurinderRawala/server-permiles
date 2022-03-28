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

async function getDriverById (driverRepo, log, driver, callback){
    log.info({driver}, 'get driver by id')
    const query = driver.id? {where:{id: driver.id}} : {}
    const res = await driverRepo.findAll(query)
    log.info({res}, 'get list of driver')
    callback(null, res)
}

module.exports = {
    createAddDriver: ({driverRepo, log}) =>  addDriver.bind(null, driverRepo, log),
    createUpdateDriver: ({driverRepo, log}) => updateDriver.bind(null, driverRepo, log),
    createGetDriver: ({driverRepo, log}) => getDriverById.bind(null, driverRepo, log)
}
