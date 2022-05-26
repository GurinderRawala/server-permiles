const express = require('express')
const routes = require('./routes') 
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { configureModules } = require('../lib/configure-modules')

module.exports.startServer = async (config) => {
    const modules = await configureModules(config)
    const { log } = modules
    const { port: PORT} = config
    const server = express()

    log.info('permiles-api is starting...')

    server.use(express.static('public'));
    server.use(bodyParser.json())
    server.use(cookieParser())
    routes.registerAllRoutes(server, modules)  
    server.use( (error, req, res, next) =>{
        res.status(422)
        res.json(error)
        next()
    })
    server.listen(PORT, () => 
        log.info({ PORT }, 'permiles-api started succesfully')
    );

    return server
}
