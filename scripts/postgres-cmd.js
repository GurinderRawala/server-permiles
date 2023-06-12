const { Client } = require('pg')
const config = require('../config.js')
const { configureModules } = require('../lib/configure-modules')
async function pgCmd() {
  const { log } = await configureModules(config)
  const client = new Client({
    user: config.postgres.username,
    host: config.postgres.host,
    database: config.postgres.database,
    password: config.postgres.password,
    post: 5432,
  })
  client.connect((err) => {
    if (err) {
      return log.error(err)
    }
  })
  client.query(
    'ALTER SEQUENCE trips_tripid_seq RESTART WITH 1000',
    (err, res) => {
      if (err) {
        return log.error(err, 'Error Altering table')
      }
      log.info(res, 'Table has been altered')
      client.end()
      process.exit(0)
    }
  )
}
pgCmd()
