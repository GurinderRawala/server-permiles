const { startServer } = require('./server.js')
const config = require('../config.js').defaultConfig()

startServer(config)
