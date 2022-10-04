const { GraphQLObjectType } = require("graphql");
const { graphQLTypes } = require("./types");
module.exports.registerMutation = (server, modules) =>{
    const { log, trailerRepo } = modules;
    log.info("mutation")
    const mutation = new GraphQLObjectType({
        name: 'Mutation',
        description: "Muatating data",
        fields:{
            addTrailer: {
                type: graphQLTypes.outputTypes.Trailer,
                args: {
                    input:{
                        type: graphQLTypes.inputTypes.Trailer
                    }
                },
                resolve: async (_, args) => await trailerRepo.create({ ...args.input })
            }
        }
    });

    return mutation;
}