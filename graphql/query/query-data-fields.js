const { GraphQLList, GraphQLString } = require("graphql");
const { graphQLTypes } = require("../types");
const createWhereCondition = (ctx) => ({ where:{ clientid: ctx.clientid } })
module.exports.queryDataFields = (resolver) => ({
    trailers:{
        type: new GraphQLList(graphQLTypes.outputTypes.Trailer),
        resolve: async(_, args, context) => await resolver.findAll(
            "trailerRepo", createWhereCondition(context))
    },
    trucks:{
        type: new GraphQLList(graphQLTypes.outputTypes.Truck),
        resolve: async(_, args, context) => await resolver.findAll(
            "truckRepo", createWhereCondition(context))
    },
    userAccounts:{
        type: new GraphQLList(graphQLTypes.outputTypes.UserAccount),
        resolve: async(_, args, context) => await resolver.findAll(
            "userAccountRepo", createWhereCondition(context))
    },
    loads:{
        type: new GraphQLList(graphQLTypes.outputTypes.Load),
        resolve: async(_, args, context) => await resolver.findAll(
            "loadRepo", createWhereCondition(context))
    },
    brokers:{
        type: new GraphQLList(graphQLTypes.outputTypes.Broker),
        resolve: async(_, args, context) => await resolver.findAll(
            "brokerRepo", createWhereCondition(context))
    },
    drivers:{
        type: new GraphQLList(graphQLTypes.outputTypes.Driver),
        resolve: async(_, args, context) => await resolver.findAll(
            "driverRepo", createWhereCondition(context))
    },
    clients:{
        type: new GraphQLList(graphQLTypes.outputTypes.Client),
        resolve: async(_, args, context) => await resolver.findAll(
            "driverRepo", createWhereCondition(context))
    },
    trips: {
        type: new GraphQLList(graphQLTypes.outputTypes.Trip),
        resolve: async(_, args, context) => await resolver.findAll(
            "tripRepo", createWhereCondition(context))
    },
})

const argsForPk = {
    id:{
        type: GraphQLString,
        description: "Primary key to find Data"
    }
}

module.exports.queryByPk = (resolver) =>({
    findTrailerByPk: {
        type: graphQLTypes.outputTypes.Trailer,
        args: argsForPk,
        resolve: async(_, args) => await resolver.findByPk("trailerRepo", args.id)
    },
    findTripByPk: {
        type: graphQLTypes.outputTypes.Trip,
        args: argsForPk,
        resolve:  async(_, args) => await resolver.findByPk("tripRepo", args.id)
    },
    findTruckByPk: {
        type: graphQLTypes.outputTypes.Truck,
        args: argsForPk,
        resolve:  async(_, args) => await resolver.findByPk("truckRepo", args.id)
    },
    findLoadByPk: {
        type: graphQLTypes.outputTypes.Load,
        args: argsForPk,
        resolve:  async(_, args) => await resolver.findByPk("loadRepo", args.id)
    },
    findClientByPk: {
        type: graphQLTypes.outputTypes.Client,
        args: argsForPk,
        resolve:  async(_, args) => await resolver.findByPk("clientRepo", args.id)
    },
    findUserByPk: {
        type: graphQLTypes.outputTypes.UserAccount,
        args: argsForPk,
        resolve:  async(_, args) => await resolver.findByPk("userAccountRepo", args.id)
    },
    findDriverByPk: {
        type: graphQLTypes.outputTypes.Driver,
        args: argsForPk,
        resolve:  async(_, args) => await resolver.findByPk("driverRepo", args.id)
    }
})