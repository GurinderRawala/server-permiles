const { GraphQLObjectType } = require("graphql");
const { Resolver } = require("../resolvers");
const { clientMutationField } = require("./client-mutation");
const { genrateCreateMutation, genrateUpdateMutation } = require("./mutation-fields");
module.exports.registerMutation = (server, modules) =>{
    const resolver = new Resolver(modules)
    const mutation = new GraphQLObjectType({
        name: 'Mutation',
        description: "Mutating data",
        fields:{
            ...genrateCreateMutation(resolver),
            ...genrateUpdateMutation(resolver),
            ...clientMutationField(resolver)
        }
    });

    return mutation;
}