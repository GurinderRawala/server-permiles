import { PerMilesConfig } from '../config'

const bunyan = require('bunyan')
const RBAC = require('easy-rbac')
const { createMailer } = require('./mailer')
const { getConnection } = require('../api/postgres')
const { createTokenService } = require('./token-service')
const { createGetSessionHandler } = require('./session-handler')
const {
  createConfigureMiddleware,
  validationMiddleware,
  fileUploadMiddleware,
} = require('../api/middleware')
const {
  createDriverModel,
  createUserAccountModel,
  createClientAccountModel,
  createBrokerModel,
  createLoadModel,
  createTripModel,
  createTruckModel,
  createTrailerModel,
  createPayrollModel,
} = require('../lib/models')
const permissions = require('./permissions')
const { createHashingService } = require('./hash-service')
const {
  fileUploadService,
  getFileListService,
  getFileObjectService,
  deleteFileObjectService,
} = require('./file-upload-service')

exports.configureModules = async (config: PerMilesConfig) => {
  const log = bunyan.createLogger(config.log)
  const rbac = new RBAC(permissions)
  const clock = createClock()
  const token = createTokenService(config.privateKey)
  const mailer = createMailer(config.mailer, log)
  const hashingService = createHashingService(log)
  const uploadMiddleware = fileUploadMiddleware()
  const uploadService = fileUploadService(config.awsBucket, log)
  const scanFolderService = getFileListService(config.awsBucket, log)
  const getFileService = getFileObjectService(config.awsBucket, log)
  const deleteFileService = deleteFileObjectService(config.awsBucket, log)
  const sessionHandler = await createGetSessionHandler(log, config.privateKey)

  const sequelize = await getConnection(
    { connection: config.postgres, config: config.sequelize },
    log
  )
  const driverRepo = createDriverModel(sequelize)
  const userAccountRepo = createUserAccountModel(sequelize)
  const clientRepo = createClientAccountModel(sequelize)
  const brokerRepo = createBrokerModel(sequelize)
  const loadRepo = createLoadModel(sequelize)
  const tripRepo = createTripModel(sequelize)
  const truckRepo = createTruckModel(sequelize)
  const trailerRepo = createTrailerModel(sequelize)
  const payrollRepo = createPayrollModel(sequelize)

  const authenticationMiddleware = createConfigureMiddleware({
    log,
    rbac,
    userAccountRepo,
    enabled: config.authentication.enabled,
    token,
    uuidRegex: config.uuidRegex,
  })
  const validation = validationMiddleware({
    userAccountRepo,
    clientRepo,
    driverRepo,
    brokerRepo,
    loadRepo,
    tripRepo,
    truckRepo,
    trailerRepo,
  })

  return {
    authenticationMiddleware,
    validation,
    uploadMiddleware,
    clock,
    log,
    mailer,
    sequelize,
    token,
    hashingService,
    uploadService,
    scanFolderService,
    getFileService,
    deleteFileService,
    sessionHandler,
    driverRepo,
    userAccountRepo,
    clientRepo,
    brokerRepo,
    loadRepo,
    tripRepo,
    truckRepo,
    trailerRepo,
    payrollRepo,
  }
}

const createClock = () => {
  return () => {
    const now = new Date()

    const toISOString = () => now.toISOString()

    return { toISOString }
  }
}
