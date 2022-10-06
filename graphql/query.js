const { GraphQLObjectType, GraphQLList } = require("graphql");
const { Resolver } = require("./resolvers");
const { graphQLTypes } = require("./types");

module.exports.registerQuery = (server, modules) =>{
    const resolver = new Resolver(modules)
    const query = new GraphQLObjectType({
        name: 'Query',
        description: "Query data from graphql",
        fields:{
            trailers:{
                type: new GraphQLList(graphQLTypes.outputTypes.Trailer),
                resolve: async(_, args, context) => await resolver.findAll(
                    "trailerRepo", 
                    { where: { clientid: context.clientid }})
            },
            trucks:{
                type: new GraphQLList(graphQLTypes.outputTypes.Truck),
                resolve: async(_, args, context) => await resolver.findAll(
                    "truckRepo", 
                    { where: { clientid: context.clientid }})
            },
            userAccounts:{
                type: new GraphQLList(graphQLTypes.outputTypes.UserAccount),
                resolve: async(_, args, context) => await resolver.findAll(
                    "userAccountRepo", 
                    { where: { clientid: context.clientid }})
            },
            loads:{
                type: new GraphQLList(graphQLTypes.outputTypes.Load),
                resolve: async(_, args, context) => await resolver.findAll(
                    "loadRepo", 
                    { where: { clientid: context.clientid }})
            },
            brokers:{
                type: new GraphQLList(graphQLTypes.outputTypes.Broker),
                resolve: async(_, args, context) => await resolver.findAll(
                    "brokerRepo", 
                    { where: { clientid: context.clientid }})
            },
            drivers:{
                type: new GraphQLList(graphQLTypes.outputTypes.Driver),
                resolve: async(_, args, context) => await resolver.findAll(
                    "driverRepo", 
                    { where: { clientid: context.clientid }})
            },
            clients:{
                type: new GraphQLList(graphQLTypes.outputTypes.Client),
                resolve: async(_, args, context) => await resolver.findAll(
                    "driverRepo", 
                    { where: { clientid: context.clientid }})
            },
            trips: {
                type: new GraphQLList(graphQLTypes.outputTypes.Trip),
                resolve: async(_, args, context) => await resolver.findAll(
                    "tripRepo", 
                    { 
                        where: {  clientid: context.clientid }
                    })
            }
        }
    });

    return query;
}