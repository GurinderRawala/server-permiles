const { Sequelize } = require('sequelize')

exports.getConnection = async ({ connection, config }, log) => {
  log.info('connecting to database...')
  try {
    const { database, username, password, host } = connection
    const sequelize = new Sequelize(database, username, password, {
      host,
      ...config,
    })
    await sequelize.authenticate()
    log.info('connection to database been established successfully.')
    return sequelize
  } catch (error) {
    log.error(error, 'unable to connect to the database:')
  }
}
