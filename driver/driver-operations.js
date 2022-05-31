const { Driver } = require("./driver")

async function addDriver (driverRepo, log, driver, callback) {
    try{
        log.info({driver}, 'adding driver')
        const res = await driverRepo.create(driver)
        log.info({res}, 'driver added')
        return callback(null, {msg: `${driver.firstname} has been added as a driver`})
    }catch(err){
        log.error(err)
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

async function getDriverByEmail ( driverRepo, log, driver, callback ){
    try{
        const res = await driverRepo.findOne({ where:{ email: driver.email }})
        log.info({ res }, 'driver retrived successfully')
        callback(null, res)
    }catch(err){
        log.error({ err }, 'Error finding driver')
        callback(err)
    }
}

async function inviteDriver ( driverRepo, log, uploadService, clock, token, mailer, driver, files, callback ){
    const inviteDriver = await Driver.createInviteDriver(driver, files, { clock, uploadService, token })
    const response = await addDriver (driverRepo, log, inviteDriver, (err, response) =>{
        if(err){ return callback(err)}
        return response
    })
    const payload = {
        firstname: inviteDriver.firstname,
        company: 'Per Miles',
        inviteLink: inviteDriver.token
    }
    log.info(response, "response to added driver")
    const subject = `Invitation to join Per Miles`;
    mailer.send('invite-user.hbs', { to: inviteDriver.email, subject, payload})
    callback(null,{msg: `Invitation has been sent to the driver`})
    
}

module.exports = {
    createInviteDriver: ({driverRepo, log, uploadService, clock, token, mailer }) =>  inviteDriver.bind(null, driverRepo, log, uploadService, clock, token, mailer),
    createUpdateDriver: ({driverRepo, log}) => updateDriver.bind(null, driverRepo, log),
    createGetDriver: ({driverRepo, log}) => getDriverById.bind(null, driverRepo, log),
    createGetDriverByEmail: ({driverRepo, log}) => getDriverByEmail.bind(null, driverRepo, log)
}
