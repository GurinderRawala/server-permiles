const { GraphQLSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql')

module.exports.registerGraphQL = (server, modules) =>{
    const rootMutation = require('./mutation').registerMutation(server, modules);
    const rootQuery = require('./query').registerQuery(server, modules);
    const schema = new GraphQLSchema({
        query: rootQuery,
        mutation: rootMutation
    })

    server.use('/graphql', graphqlHTTP({
        schema,
        pretty: true,
        graphiql: true
    }))
}