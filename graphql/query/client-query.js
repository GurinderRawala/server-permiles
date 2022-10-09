const { GraphQLList } = require("graphql");
const { graphQLTypes } = require("../types");
exports.clientQueryField = (resolver) => ({
    clients: {
        type: new GraphQLList(graphQLTypes.outputTypes.Client),
        resolve: async(_, __, ctx) => {
            if(ctx.role !== "superAdmin"){
                return;
            }
            return await resolver.findAll("clientRepo")
        }
    }
})