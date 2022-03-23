

module.exports.registerAllRoutes = (server, config, deps) => {
    require('./drivers.js').registerRoutes(server, config)
}


