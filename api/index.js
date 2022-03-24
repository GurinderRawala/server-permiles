const { startServer } = require('./server.js')
const config = require('../config.js').loadConfig()

startServer(config)
