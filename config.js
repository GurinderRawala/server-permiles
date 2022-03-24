const bunyan = require('bunyan')
exports.loadConfig = (component) => rc('permiles', exports.defaultConfig(component))

exports.defaultConfig = (component) => ({
    port: 8081,
    log: {
        name: 'permiles.api',
        level: 'info'
      },
    postgres: {
      connection: "postgres://postgres:NInAN5t3kJo8d7I3@localhost:5432/permiles"
    }
})