const { GraphQLSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

module.exports.registerGraphQL = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions, uuidMiddleware }, sessionHandler } = modules
    const permissionsGraphQL = permissions('userAccount:graphql')
    const rootMutation = require('./mutation').registerMutation(server, modules);
    const rootQuery = require('./query').registerQuery(server, modules);
    const schema = new GraphQLSchema({
        query: rootQuery,
        mutation: rootMutation
    });
    server.use('/graphql', [sessionHandler, determineUserRole, permissionsGraphQL, uuidMiddleware], 
        graphqlHTTP((req) => ({
            schema,
            context: req,
            pretty: true,
            graphiql: true
        })));

    // driver app graphql query and mutation
    const driverAppQuery = require("./query").registerDriverAppGraphQL(server, modules);
    const driverAppMutation = require("./mutation").registerDriverMutation(server, modules);
    const driverAppGraphQL = new GraphQLSchema({
        query: driverAppQuery,
        mutation: driverAppMutation
    });
    server.use('/driver-app/graphql', [sessionHandler, determineUserRole, uuidMiddleware], 
        graphqlHTTP(
            (req) =>(
                {
                    schema: driverAppGraphQL,
                    context: req,
                    pretty: true,
                    graphiql: true
                }
            )));
}