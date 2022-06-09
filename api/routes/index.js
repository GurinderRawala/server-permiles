

module.exports.registerAllRoutes = (server, modules) => {
    require('./drivers.js').registerRoutes(server, modules)
    require('./user-accounts.js').registerRoutes(server, modules)
    require('./clients.js').registerRoutes(server, modules)
    require('./brokers.js').registerRoutes(server, modules)
    require('./loads.js').registerRoutes(server, modules)
    require('./trips.js').registerRoutes(server,modules)
}


