const { GraphQLObjectType } = require("graphql");
const { Resolver } = require("../resolvers");
const { queryByPk, queryDataFields } = require("./query-fields")

module.exports.registerQuery = (server, modules) =>{
    const resolver = new Resolver(modules)
    const query = new GraphQLObjectType({
        name: 'Query',
        description: "Query data from graphql",
        fields:{
            ...queryDataFields(resolver),
            ...queryByPk(resolver)
        }
    });

    return query;
}