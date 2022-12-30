const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const { graphQLTypes } = require("../../types");
const { Op } = require("sequelize");

exports.registerDriverAppQuery = (_, modules) =>{
    const query = new GraphQLObjectType({
        name: 'Query',
        description: "Query data from driver app graphql",
        fields:{
            ...tripsGraphQL(modules),
            ...driverInfoGraphQL(modules),
            ...findTrailerGraphQL(modules),
            ...loadsGraphQL(modules),
        }
    });

    return query;
}

const tripsGraphQL = ({ tripRepo }) =>({
    findAssignedTrips: {
        type: new GraphQLList(graphQLTypes.outputTypes.Trip),
        args: {
            orderBy:{
                type: GraphQLString,
                description: "Order by asc or desc, it order by tripId" 
            },
            where: {
                type: graphQLTypes.inputTypes.Trip,
                description: "Find trip with trip inputs" 
            }
        },
        resolve: async(_, args, context) =>{
            const variables = {
                where: { 
                    [Op.and]:[
                        { assignedTo: context.driverId },
                        { ...args.where }
                    ]
                },
                order: [ ["createdAt", args.orderBy || "DESC"] ]
            }
            return await tripRepo.findAll(variables)
        } 
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
        resolve: async(_, __, context) => await loadRepo.findAll({where: { assignedTo: context.driverId } })
    }
});

const findTrailerGraphQL = ({ trailerRepo }) =>({
    findTrailers: {
        type: new GraphQLList(graphQLTypes.outputTypes.Trailer),
        args: {
            where: {
                type: graphQLTypes.inputTypes.Trailer,
                description: "Find trailers with trailer input" 
            },
            orderBy:{
                type: GraphQLString,
                description: "Order by asc or desc, it order by tripId" 
            },
        },
        resolve: async(_, args, ctx) => {
            const variables = {
                where: { 
                    [Op.and]:[
                        { clientid: ctx.body.clientid },
                        { ...args.where }
                    ]
                },
                order: [ ["createdAt", args.orderBy || "ASC"] ]
            }
            return await trailerRepo.findAll(variables)

        }
    }
});