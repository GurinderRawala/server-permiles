const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const { resolver } = require("graphql-sequelize");
const models = require("../lib/models");
const { graphQLTypes } = require("./types");

module.exports.registerQuery = (server, modules) =>{
    const { log } = modules;
    log.info("query")
    const query = new GraphQLObjectType({
        name: 'Query',
        description: "Query data from graphql",
        fields:{
            trailers:{
                type: new GraphQLList(graphQLTypes.outputTypes.Trailer),
                args: {
                    id: {
                        type: GraphQLString
                    }
                },
                resolve: resolver(models.Trailer, {
                    before: (findOptions, args) => {
                        findOptions.where = {
                            id: args.id,
                        }
                        return findOptions;
                    },
                })
            }
        }
    });

    return query;
}