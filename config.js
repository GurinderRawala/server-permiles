const bunyan = require('bunyan')
exports.loadConfig = (component) => rc('permiles', exports.defaultConfig(component))

exports.defaultConfig = (component) => ({
  authentication: {
    enabled: false
  },
  log: {
    name: 'permiles.api',
    level: 'info'
  },
  port: 8081,
  postgres: {
    host: 'localhost',
    database: 'permiles',
    username: 'postgres',
    password: 'NInAN5t3kJo8d7I3',
  },
  sequelize : {
    dialect: 'postgres',
    logging : false
  }
})