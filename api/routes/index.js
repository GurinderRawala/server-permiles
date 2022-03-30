

module.exports.registerAllRoutes = (server, modules) => {
    require('./drivers.js').registerRoutes(server, modules)
    require('./user-accounts.js').registerRoutes(server, modules)
    require('./client-accounts.js').registerRoutes(server, modules)
}


