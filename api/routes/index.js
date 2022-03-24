

module.exports.registerAllRoutes = (server, modules) => {
    require('./drivers.js').registerRoutes(server, modules)
}


