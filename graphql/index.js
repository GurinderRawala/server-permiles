const { GraphQLSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql')

module.exports.registerGraphQL = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions }, sessionHandler } = modules
    const permissionsAddTrailer = permissions('trailer:add-trailer')
    const rootMutation = require('./mutation').registerMutation(server, modules);
    const rootQuery = require('./query').registerQuery(server, modules);
    const schema = new GraphQLSchema({
        query: rootQuery,
        mutation: rootMutation
    })

    server.use('/graphql', [sessionHandler, determineUserRole, permissionsAddTrailer], graphqlHTTP({
        schema,
        pretty: true,
        graphiql: true
    }))
}