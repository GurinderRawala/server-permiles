exports.loadConfig = () => rc('permiles', exports.defaultConfig(component))

exports.defaultConfig = () => ({
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