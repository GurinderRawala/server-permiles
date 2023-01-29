const { GraphQLObjectType, GraphQLList } = require("graphql");
const { graphQLTypes } = require("../../types");
const { generateQueryFields } = require("../query-fields");
const { Resolver } = require("../../resolvers");
const { MODEL_REPO } = require("../../consts");
const { createCommonArgs, createWhereCondition, mapToJSONparse } = require("../utils");
const { merge } = require("lodash");
const { tripOutputQL } = require("../../trip");

const registerDriverAppQuery = (_, modules) =>{
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

const tripsGraphQL = ({ tripRepo, loadRepo, log }) =>({
    findAssignedTrips: {
        type: new GraphQLList(tripOutputQL),
        args: createCommonArgs(graphQLTypes.inputTypes.Trip),
        resolve: resolveWithModifiedTripOutput({ tripRepo, loadRepo, log })
    }
});

function resolveWithModifiedTripOutput({ tripRepo, loadRepo, log }){
    return async function (_, args, ctx){
        try{
            log.info({args, ctx: ctx.body})
            const assignedTrips = await tripRepo.findAll(createWhereCondition(ctx,  mergeForDriverIdCondition(ctx, args) ));
            const response = await Promise.all( assignedTrips.map( async (trip) =>{
                const tripInfoList = trip.tripInfo.map(mapToJSONparse);
                const loads = await Promise.all(tripInfoList.map( async ({id}) => {
                    const { dataValues } = await loadRepo.findByPk(id) 
                    return {
                        ...dataValues,
                        shipper: dataValues.shipper.map(mapToJSONparse),
                        receiver: dataValues.receiver.map(mapToJSONparse)
                    }
                }));
                return {
                    ...trip.dataValues,
                    tripInfo: loads
                }
            }))

            log.info({response}, "assigned trips: driver graphQL");

            return response;

        }catch(err){
            log.error({err})
            throw new Error(err);
        }
    }
}

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

module.exports = {
    resolveWithModifiedTripOutput,
    registerDriverAppQuery
}