const registerDriverAppGraphQL = (server, modules) => require("./driver-query").registerDriverAppQuery(server, modules);
module.exports = {
    registerDriverAppGraphQL,
    resolveWithModifiedTripOutput: require("./driver-query").resolveWithModifiedTripOutput
}