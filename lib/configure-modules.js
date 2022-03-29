const bunyan = require('bunyan')
const configureAuthMiddleware = require('../api/middleware/configure-authentication')
const { getConnection } = require('../api/postgres')
const { createDriverModel, createUserAccountModel }= require('../lib/models')
const encrypt = require('./encrypt')

exports.configureModules = async (config) => {
    const log = bunyan.createLogger(config.log)
    const sequelize = await getConnection({connection: config.postgres, config: config.sequelize}, log)
    const authenticationHandlers = []
    const driverRepo = createDriverModel(sequelize)
    const userAccountRepo = createUserAccountModel(sequelize)
    const { createHashPassword } = encrypt
    if (config.authentication.enabled) {
        const authenticationMiddlware = configureAuthMiddleware()
        authenticationHandlers.push(authenticationMiddlware())
      }
    
    
    return {
        authenticationHandlers,
        log,
        sequelize,
        driverRepo,
        userAccountRepo,
        createHashPassword
    }
}