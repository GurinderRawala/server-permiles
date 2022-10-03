const { GraphQLObjectType, GraphQLBoolean } = require("graphql")

module.exports.registerMutation = (server, modules) =>{
    const { log } = modules;
    log.info("mutation")
    const mutation = new GraphQLObjectType({
        name: 'Mutation',
        description: "Query data from graphql",
        fields:{
            addTrailer: {
                type: GraphQLBoolean,
                resolve: () => true
            }
        }
    });

    return mutation;
}