const { configureModules } = require('../lib/configure-modules')
const config = require('../config.js')

const syncTable = async (log, table) => {
    log.info( { table } ,'syncing model')
    try {
        await table.sync({ alter : true, force : true})
    }
    catch (ex) {
        log.error( { table, ex}, 'failed to sync')
    }
    log.info({ table } , 'model synced')
} 

const sync = async () => {
    try {
        const { log,  driverRepo, userAccountRepo, clientRepo } = await configureModules(config)
        
        log.info( 'starting database sync')
        await syncTable(log, driverRepo)
        await syncTable(log, userAccountRepo)
        await syncTable(log, clientRepo)
        log.info( 'database sync complete')
        process.exit(0) 
    }
    catch (ex) {
        console.log( { ex }, 'database sync failed')
    }
}

sync()

