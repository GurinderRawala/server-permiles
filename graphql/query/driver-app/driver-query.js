const { GraphQLObjectType, GraphQLList } = require("graphql");
const { graphQLTypes } = require("../../types");
const { generateQueryFields } = require("../query-fields");
const { Resolver } = require("../../resolvers");
const { MODEL_REPO } = require("../../consts");
const { createCommonArgs, createWhereCondition } = require("../utils");
const { merge } = require("lodash");

exports.registerDriverAppQuery = (_, modules) =>{
    const resolver = new Resolver(modules);
    const query = new GraphQLObjectType({
        name: 'Query',
        description: "Query data from driver app graphql",
        fields:{
            ...tripsGraphQL(modules),
            ...driverInfoGraphQL(modules),
            ...generateQueryFields(resolver, [MODEL_REPO[0]]),
            ...loadsGraphQL(modules),
        }
    });

    return query;
}

const tripsGraphQL = ({ tripRepo }) =>({
    findAssignedTrips: {
        type: new GraphQLList(graphQLTypes.outputTypes.Trip),
        args: createCommonArgs(graphQLTypes.inputTypes.Trip),
        resolve: async(_, args, ctx) => await tripRepo.findAll(createWhereCondition(ctx,  mergeForDriverIdCondition(ctx, args) ))
    }
});

const driverInfoGraphQL = ({ driverRepo }) =>({
    driverInfo: {
        type: graphQLTypes.outputTypes.Driver,
        resolve: async(_, __, context) => await driverRepo.findByPk(context.driverId)
    }
});

const loadsGraphQL = ({ loadRepo }) =>({
    findAssignedLoads: {
        type: new GraphQLList(graphQLTypes.outputTypes.Load),
        args: createCommonArgs(graphQLTypes.inputTypes.Load),
        resolve: async(_, args, ctx) => await loadRepo.findAll(createWhereCondition(ctx, mergeForDriverIdCondition(ctx, args)  ))
    }
});

const mergeForDriverIdCondition = (ctx, args) => merge({}, args, { where: { assignedTo: ctx.driverId, ...args.where }})