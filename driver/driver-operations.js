const { createGetClient } = require("../clients/client-operations")
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
        return callback(null, res)
    }catch(err){
        log.error({ err }, 'Error finding driver')
        return callback(err)
    }
}

async function inviteDriver ( driverRepo, clientRepo, log, uploadService, clock, token, mailer, driver, files, callback ){
    const inviteDriver = await Driver.createInviteDriver(driver, files, { clock, uploadService, token })
    const response = await addDriver (driverRepo, log, inviteDriver, (err, response) =>{
        if(err){ return callback(err)}
        return response
    })
    const getClient = createGetClient({clientRepo, log})
    const client = { id: driver.clientid }
    const { name } = await getClient(client, (err, info) => {
        if(err){ return callback(err)}
        return info
    })
    const payload = {
        firstname: inviteDriver.firstname,
        company: name,
        inviteLink: inviteDriver.token,
        driverAppLink: {
            googlePlayStore: 'https://permiles.com',
            appleStore: 'https://permiles.com'
        }
    }
    const subject = `Invitation to join Per Miles`;
    mailer.send('invite-driver.hbs', { to: inviteDriver.email, subject, payload})
    callback(null,{msg: `Invitation sent, ${response.msg}`})
    
}

async function activateDriverAccount ( driverRepo, log, hashingService, driver, callback){
    const driverPayload = await Driver.createActiveDriverAccount(driver, {hashingService, log});
    await updateDriver(driverRepo, log, driverPayload, (err) =>{
        if(err){ return callback(err) }
        callback(null, {msg: 'Driver Account has been activated'})
    })
}

async function resetPasswordDriver ( driverRepo, log, mailer, token, driver, callback ){
    log.info({driver}, 'user requesting for password reset')
    const driverInfo = await getDriverByEmail(driverRepo, log, driver, (err, info) =>{
        if(err) { return callback(err) }
        return info
    })
    const accessToken = token.create({ 
        id: driverInfo.id, 
        email: driverInfo.email, clientid: driverInfo.clientid }, 
    {  expiresIn: '1h' })
    const payload = {
        firstname: driverInfo.firstname,
        resetLink: accessToken
    }
    const subject = `Reset Password for Per Miles Driver Account`
    mailer.send('reset-password.hbs', { to: driverInfo.email, subject, payload })
    callback(null, { msg: `Reset password request is sent to your email` })
}

module.exports = {
    createInviteDriver: ({driverRepo, clientRepo, log, uploadService, clock, token, mailer }) =>  inviteDriver.bind(null, driverRepo, clientRepo, log, uploadService, clock, token, mailer),
    createUpdateDriver: ({driverRepo, log}) => updateDriver.bind(null, driverRepo, log),
    createGetDriver: ({driverRepo, log}) => getDriverById.bind(null, driverRepo, log),
    createGetDriverByEmail: ({driverRepo, log}) => getDriverByEmail.bind(null, driverRepo, log),
    createActiveDriverAccount: ({ driverRepo, log, hashingService }) => activateDriverAccount.bind(null, driverRepo, log, hashingService),
    createResetPasswordDriver: ({ driverRepo, log, mailer, token }) => resetPasswordDriver.bind(null, driverRepo, log, mailer, token)
}
