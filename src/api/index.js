require('dotenv').config()
const { startServer } = require('./server.js')
const config = require('../config.js')

startServer(config)
