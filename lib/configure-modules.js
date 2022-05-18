const bunyan = require('bunyan')
const RBAC = require('easy-rbac');
const { createMailer } = require('./mailer');
const { getConnection } = require('../api/postgres')
const { createTokenService } = require('./token-service')
const { createGetSessionHandler } = require('./session-handler')
const { createConfigureMiddlewares, validationMiddleware } = require('../api/middleware')
const { createDriverModel, createUserAccountModel, createClientAccountModel }= require('../lib/models');
const permissions = require('./permissions');
const { createHashingService } = require('./hash-service');

exports.configureModules = async (config) => {

    const log = bunyan.createLogger(config.log)
    const rbac = new RBAC(permissions);
    const clock = createClock()
    const token = createTokenService(config.privateKey)
    const mailer = createMailer(config.mailer,log)
    const hashingService = createHashingService(log)
    const sessionHandler = await createGetSessionHandler(log, config.privateKey)

    const sequelize = await getConnection({connection: config.postgres, config: config.sequelize}, log)
    const driverRepo = createDriverModel(sequelize)
    const userAccountRepo = createUserAccountModel(sequelize)
    const clientRepo = createClientAccountModel(sequelize)

    const authenticationMiddlware = createConfigureMiddlewares( { log, rbac, userAccountRepo, enabled: config.authentication.enabled })
    const validation = validationMiddleware({ userAccountRepo, clientRepo })
    
    return {
        authenticationMiddlware,
        validation,
        clock,
        log,
        mailer,
        sequelize,
        token,
        hashingService,
        sessionHandler,
        driverRepo,
        userAccountRepo,
        clientRepo,
    }
}

const createClock = () => {
    return () => {
        const now = new Date()
  
        const toISOString = () => now.toISOString()
  
        return { toISOString }
    }
}