const cors = require('cors')
const express = require('express')
const routes = require('./routes') 
const bodyParser = require('body-parser')
const { getConnection } = require('./postgres')

module.exports.startServer = async (config) => {
  const { port: PORT } = config
  const server = express()
  const dependencies = {}

  server.use(express.static('public'));
  server.use(bodyParser.json())
  routes.registerAllRoutes(server, config)  
  server.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`)
  );

  return server
}
