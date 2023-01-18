const { GraphQLObjectType, GraphQLNonNull, GraphQLEnumType, GraphQLID } = require('graphql');
const { resolveWithModifiedTripOutput } = require('../../query/driver-app/');
const { tripOutputQL } = require('../../trip');

exports.registerDriverMutation = (_, modules) => new GraphQLObjectType({
    name: 'driverMutations',
    description: 'Driver app mutations',
    fields: {
        ...this.driverMutationFields(modules)
    }
});

exports.driverMutationFields = ({ log, tripRepo, ...modules }) =>({
    responseToTrip: {
        type: tripOutputQL,
        args: {
            driverResponse: {
                type: new GraphQLNonNull( this.driverResponseEnum ),
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

exports.driverResponseEnum = new GraphQLEnumType(
    {
        name: "driverResponseEnum",
        values: {
            CREATED: { value: "CREATED" },
            PENDING: { value: "PENDING" },
            ACCEPTED: { value: "ACCEPTED" },
            MOVING: {value: "MOVING"},
            LOADING: { value: "LOADING"},
            LOADED: { value: "LOADED"},
            DELIVERING: {value: "DELIVERING"},
            DELIVERED: {value: "DELIVERED"}
        }
    }
)

exports.createTripStatus = (driverResponse) => {
    if( driverResponse ) {
        return "ACCEPTED"
    }

    return "CREATED";
}