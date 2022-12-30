const { GraphQLSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

module.exports.registerGraphQL = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions, uuidMiddleware }, sessionHandler } = modules
    const permissionsAddTrailer = permissions('trailer:add-trailer')
    const rootMutation = require('./mutation').registerMutation(server, modules);
    const rootQuery = require('./query').registerQuery(server, modules);
    const schema = new GraphQLSchema({
        query: rootQuery,
        mutation: rootMutation
    });
    server.use('/graphql', [sessionHandler, determineUserRole, permissionsAddTrailer, uuidMiddleware], 
        graphqlHTTP((req) => ({
            schema,
            context: req,
            pretty: true,
            graphiql: true
        })));

    const driverAppQuery = require("./query").registerDriverAppGraphQL(server, modules);
    const driverAppGraphQL = new GraphQLSchema({
        query: driverAppQuery
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