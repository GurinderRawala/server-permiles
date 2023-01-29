const { GraphQLNonNull, GraphQLEnumType, GraphQLID } = require('graphql');

const { resolveWithModifiedTripOutput } = require('../../query/driver-app/');
const { tripOutputQL } = require('../../trip');

const driverResponseEnum = new GraphQLEnumType(
    {
        name: "driverResponseEnum",
        values: {
            CREATED: { value: "CREATED" },
            ASSIGNED: { value: "ASSIGNED" },

            PENDING: { value: "PENDING" },

            ACCEPTED: { value: "ACCEPTED" },
            REJECTED: { value: "REJECTED" },

            LOADING: { value: "LOADING"},
            LOADED: { value: "LOADED"},
            MOVING: { value: "MOVING" },
            
            DELIVERING: {value: "DELIVERING"},
            DELIVERED: {value: "DELIVERED"},
        }
    }
)

const updateTripState =({ log, tripRepo, ...modules }) =>({
    responseToTrip: {
        type: tripOutputQL,
        args: {
            driverResponse: {
                type: new GraphQLNonNull( driverResponseEnum ),
                description: "Driver accept or reject load"
            },
            id: {
                type: new GraphQLNonNull( GraphQLID ),
                description: "Trip uuid which is updating"
            }
        },
        resolve: async (_, args, ctx) => {
            const trip = await tripRepo.update({
                state: args.driverResponse
            }, {
                where: {
                    id: args.id
                }
            })

            log.info({trip, args, ctx: ctx.driverId, id: args.id}, "Driver trip information")

            if( trip[0] === 1){
                const modifiedTripOutput = resolveWithModifiedTripOutput({ log, tripRepo, ...modules })
                const res = await modifiedTripOutput(_, { ...args, where: { ...args.where, id: args.id } }, ctx);
                return res[0];
            }

            throw new Error("Error while finding trip output")
        }
    }
})

module.exports = {
    updateTripState
}