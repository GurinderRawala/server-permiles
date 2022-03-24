

module.exports.registerAllRoutes = (server, config) => {
    require('./drivers.js').registerRoutes(server, config)
}


