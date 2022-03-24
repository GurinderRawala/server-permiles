const express = require('express')
const routes = require('./routes') 
const bodyParser = require('body-parser')
const { configureModules } = require('../lib/configure-modules')

module.exports.startServer = async (config) => {
  const modules = await configureModules(config)
  const { log } = modules
  const { port: PORT} = config
  const server = express()

  log.info('permiles-api is starting...')

  server.use(express.static('public'));
  server.use(bodyParser.json())
  routes.registerAllRoutes(server, modules)  
  server.listen(PORT, () => 
    log.info({ PORT }, 'permiles-api started succesfully')
  );

  return server
}
