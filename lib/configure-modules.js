const bunyan = require('bunyan')
const RBAC = require('easy-rbac');
const { createConfigureMiddlewares } = require('../api/middleware')
const { getConnection } = require('../api/postgres')
const { createDriverModel, createUserAccountModel, createClientAccountModel }= require('../lib/models');
const { createMailer } = require('./mailer');
const permissions = require('./permissions');

exports.configureModules = async (config) => {
    const log = bunyan.createLogger(config.log)
    const rbac = new RBAC(permissions);
    const sequelize = await getConnection({connection: config.postgres, config: config.sequelize}, log)

    const driverRepo = createDriverModel(sequelize)
    const userAccountRepo = createUserAccountModel(sequelize)
    const clientRepo = createClientAccountModel(sequelize)
    const authenticationMiddlware = createConfigureMiddlewares( { log, rbac, userAccountRepo, enabled: config.authentication.enabled })
    
    const mailer = createMailer(config.mailer)
    
    return {
        authenticationMiddlware,
        log,
        mailer,
        sequelize,
        driverRepo,
        userAccountRepo,
        clientRepo,
    }
}