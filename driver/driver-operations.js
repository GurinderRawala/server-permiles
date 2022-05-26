async function addDriver (driverRepo, log, driver, callback) {
    try{
        log.info({driver}, 'adding driver')
        const res = await driverRepo.create(driver)
        log.info({res}, 'driver added')
        return callback(null, {msg: `${driver.firstname} has been added as a driver`})
    }catch(err){
        return callback(err)
    }
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
    const res = await driverRepo.findByPk(driver.id)
    log.info({res}, 'driver information retrieved')
    callback(null, res)
}

module.exports = {
    createAddDriver: ({driverRepo, log}) =>  addDriver.bind(null, driverRepo, log),
    createUpdateDriver: ({driverRepo, log}) => updateDriver.bind(null, driverRepo, log),
    createGetDriver: ({driverRepo, log}) => getDriverById.bind(null, driverRepo, log)
}
