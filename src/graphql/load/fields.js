const {
  GraphQLList,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql')

const addressFieldsQL = {
  unitNumber: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Unit number of bussiness or house number',
  },
  streetName: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Street name',
  },
  city: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Name of the city',
  },
  state: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Name of the state/province',
  },
  country: {
    type: GraphQLString,
    description: 'Name of the country',
  },
  postalCode: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Postal code for the address important',
  },
}

const addressInputQL = new GraphQLInputObjectType({
  name: 'addressInput',
  description: 'Address information',
  fields: addressFieldsQL,
})

const addressOutputQL = new GraphQLObjectType({
  name: 'addressOutput',
  description: 'Address information',
  fields: addressFieldsQL,
})

const receiverShipperCommonFieldsQL = (type, addressType = addressInputQL) => ({
  stopID: {
    type: new GraphQLNonNull(GraphQLID),
    description: `StopID(uuid) for the ${type}`,
  },
  [`${type}Name`]: {
    type: new GraphQLNonNull(GraphQLString),
    description: `The name of the ${type}`,
  },
  address: {
    type: new GraphQLNonNull(addressType),
    description: `Address of the ${type}`,
  },
  phoneNumber: {
    type: GraphQLString,
    description: `Phone number of the ${type}`,
  },
  email: {
    type: GraphQLString,
    description: `Email of the ${type}`,
  },
  arrival: {
    type: GraphQLString,
    description: `Arrival at the ${type}`,
  },
  depart: {
    type: GraphQLString,
    description: `Depart at the ${type}`,
  },
})

const shipperFields = {
  pickUpAppointment: {
    type: GraphQLString,
    description: 'Pick up appointment date and time',
  },
}

const receiverFields = {
  deliveryAppointment: {
    type: GraphQLString,
    description: 'Delivery appointment date and time',
  },
}

const receiverOutputQL = new GraphQLObjectType({
  name: 'receiverOutput',
  description: 'Receiver information',
  fields: {
    ...receiverShipperCommonFieldsQL('receiver', addressOutputQL),
    ...receiverFields,
  },
})

const shipperOutputQL = new GraphQLObjectType({
  name: 'shipperOutput',
  description: 'Shipper information',
  fields: {
    ...receiverShipperCommonFieldsQL('shipper', addressOutputQL),
    ...shipperFields,
  },
})

const receiverInputQL = new GraphQLInputObjectType({
  name: 'receiverInput',
  description: 'Receiver information',
  fields: {
    ...receiverShipperCommonFieldsQL('receiver'),
    ...receiverFields,
  },
})

const shipperInputQL = new GraphQLInputObjectType({
  name: 'shipperInput',
  description: 'Shipper information',
  fields: {
    ...receiverShipperCommonFieldsQL('shipper'),
    ...shipperFields,
  },
})

const loadFieldsQL = (receiver, shipper, type = 'output') => ({
  id: {
    type: type === 'output' ? new GraphQLNonNull(GraphQLID) : GraphQLID,
    description: `The uuid of load, automatically generated if not provided`,
  },
  assignedTo: {
    type: GraphQLID,
    description: 'Load assigned to (driverId: uuid)',
  },
  brokerId: {
    type: GraphQLString,
    description: 'Load brokerId (brokerId: uuid)',
  },
  receiver: {
    type: new GraphQLNonNull(new GraphQLList(receiver)),
    description: 'List of receivers (receiver: [string])',
  },
  shipper: {
    type: new GraphQLNonNull(new GraphQLList(shipper)),
    description: 'List of shippers (shipper: [string])',
  },
  commodity: {
    type: GraphQLString,
    description: 'Commodity of the load (commodity: string)',
  },
  hazmat: {
    type: new GraphQLNonNull(GraphQLBoolean),
    description: 'Is load is hazmat yes or no? (hazmat: boolean)',
  },
  poNumber: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Po number (poNumber: string)',
  },
  specialInstructions: {
    type: GraphQLString,
    description: 'Special instructions (specialInstructions: string)',
  },
  state: {
    type: new GraphQLNonNull(GraphQLString),
    description:
      'State (state: string), CREATED | ASSIGNED | MOVING | DELIVERED | PAID',
  },
  trailerNo: {
    type: GraphQLString,
    description: 'Assigned Trailer number (trailerNo: string)',
  },
  totalWeight: {
    type: GraphQLString,
    description: 'Total weight (totalWeight: string)',
  },
})

const loadsInputQL = new GraphQLInputObjectType({
  name: 'loadModifiedInput',
  description: 'Load modified input information',
  fields: loadFieldsQL(receiverInputQL, shipperInputQL, 'input'),
})

const loadsOutputQL = new GraphQLObjectType({
  name: 'loadModifiedOutput',
  description: 'Loads output information',
  fields: loadFieldsQL(receiverOutputQL, shipperOutputQL),
})

module.exports = {
  loadFieldsQL,
  loadsInputQL,
  loadsOutputQL,

  shipperInputQL,
  shipperFields,
  shipperOutputQL,

  receiverInputQL,
  receiverFields,
  receiverOutputQL,

  addressFieldsQL,
  addressInputQL,
  addressOutputQL,
}
