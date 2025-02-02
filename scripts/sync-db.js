const { configureModules } = require('../lib/configure-modules')
require('dotenv').config()
const config = require('../config')

const syncTable = async (log, table) => {
  log.info({ table }, 'syncing model')
  try {
    await table.sync({ alter: true, force: true })
  } catch (ex) {
    log.error({ table, ex }, 'failed to sync')
  }
  log.info({ table }, 'model synced')
}

const sync = async () => {
  try {
    const {
      log,
      driverRepo,
      userAccountRepo,
      clientRepo,
      brokerRepo,
      loadRepo,
      tripRepo,
      truckRepo,
      trailerRepo,
      payrollRepo,
    } = await configureModules(config)

    log.info('starting database sync')
    await syncTable(log, driverRepo)
    await syncTable(log, userAccountRepo)
    await syncTable(log, clientRepo)
    await syncTable(log, brokerRepo)
    await syncTable(log, tripRepo)
    await syncTable(log, loadRepo)
    await syncTable(log, truckRepo)
    await syncTable(log, trailerRepo)
    await syncTable(log, payrollRepo)
    log.info('database sync complete')
    process.exit(0)
  } catch (ex) {
    console.log({ ex }, 'database sync failed')
  }
}

sync()
