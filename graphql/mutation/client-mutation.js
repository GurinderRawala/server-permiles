const { graphQLTypes } = require("../types");

exports.clientMutationField = (resolver) =>({
    addClient: {
        type: graphQLTypes.outputTypes.Client,
        args: {
            input:{
                type: graphQLTypes.inputTypes.Client,
                discription: `Client input values`
            }
        },
        resolve: async(_, args) => await resolver.create("clientRepo", args.input)
    }
})