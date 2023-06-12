const {
  GraphQLList,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLInt,
} = require('graphql')
const { loadsOutputQL } = require('../load')

exports.tripInfoFieldsQL = {
  id: {
    type: new GraphQLNonNull(GraphQLID),
    description: 'The id of the load included in the trip',
  },
}

exports.tripInfoInputQL = new GraphQLInputObjectType({
  name: 'TripInfoInput',
  description: 'Trip information',
  fields: this.tripInfoFieldsQL,
})

exports.tripFieldsQL = (tripInfoType, type = 'output') => ({
  id: {
    type: type === 'output' ? new GraphQLNonNull(GraphQLID) : GraphQLID,
    description: 'The ID of the trip, automatically generated',
  },
  assignedTo: {
    type: new GraphQLNonNull(GraphQLID),
    description: 'The driver ID of the assigned driver',
  },
  tripInfo: {
    type: new GraphQLNonNull(new GraphQLList(tripInfoType)),
    description: 'The trip information',
  },
  state: {
    type: new GraphQLNonNull(GraphQLString),
    description:
      'State (state: string), CREATED | ASSIGNED | MOVING | DELIVERED | PAID',
  },
  totalMiles: {
    type: GraphQLFloat,
    description: 'Total miles of the trip',
  },
})

exports.tripInputQL = new GraphQLInputObjectType({
  name: 'TripModifiedInput',
  description: 'Trip input fields',
  fields: this.tripFieldsQL(this.tripInfoInputQL, 'input'),
})

exports.tripOutputQL = new GraphQLObjectType({
  name: 'TripModifiedOutput',
  description: 'Trip output fields',
  fields: {
    ...this.tripFieldsQL(loadsOutputQL),
    bol: {
      type: new GraphQLList(GraphQLString),
      description: 'BOL of the trip, aws file download link',
    },
    pod: {
      type: new GraphQLList(GraphQLString),
      description: 'POD of the trip, aws file download link',
    },
    tripId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Trip id number, automatically generated',
    },
  },
})
