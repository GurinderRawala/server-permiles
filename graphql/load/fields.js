const { 
    GraphQLList, 
    GraphQLString, 
    GraphQLInputObjectType, 
    GraphQLBoolean, 
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull
} = require('graphql');

exports.addressFieldsQL = {
    unitNumber: {
        type: new GraphQLNonNull( GraphQLString ),
        description: 'Unit number of bussiness or house number'
    },
    streetName: {
        type: new GraphQLNonNull( GraphQLString ),
        description: 'Street name'
    },
    city: {
        type: new GraphQLNonNull( GraphQLString ),
        description: 'Name of the city'
    },
    state: {
        type: new GraphQLNonNull( GraphQLString ),
        description: 'Name of the state/province'
    },
    country: {
        type: GraphQLString,
        description: 'Name of the country'
    },
    postalCode: {
        type: new GraphQLNonNull( GraphQLString ),
        description: 'Postal code for the address important'
    }
};

exports.addressInputQL = new GraphQLInputObjectType({
    name: 'addressInput',
    description: 'Address information',
    fields: this.addressFieldsQL
})

exports.addressOutputQL = new GraphQLObjectType({
    name: 'addressOutput',
    description: 'Address information',
    fields: this.addressFieldsQL
})

exports.receiverShipperCommonFieldsQL = (type, addressType = this.addressInputQL) =>({
    [`${type}Name`]: {
        type: new GraphQLNonNull(GraphQLString),
        description: `The name of the ${type}`
    },
    address: {
        type: new GraphQLNonNull( addressType ),
        description: `Address of the ${type}`
    },
    phoneNumber: {
        type: GraphQLString,
        description: `Phone number of the ${type}`
    },
    email: {
        type: GraphQLString,
        description: `Email of the ${type}`
    }
})


exports.receiverOutputQL = new GraphQLObjectType({
    name: 'receiverInput',
    description: 'Receiver infomation',
    fields: this.receiverShipperCommonFieldsQL("receiver", this.addressOutputQL)
});

exports.shipperOutputQL = new GraphQLObjectType({
    name: 'shipperInput',
    description: 'Shipper infomation',
    fields: this.receiverShipperCommonFieldsQL("shipper", this.addressOutputQL)
});


exports.receiverInputQL = new GraphQLInputObjectType({
    name: 'receiverInput',
    description: 'Receiver infomation',
    fields: this.receiverShipperCommonFieldsQL("receiver")
});

exports.shipperInputQL = new GraphQLInputObjectType({
    name: 'shipperInput',
    description: 'Shipper infomation',
    fields: this.receiverShipperCommonFieldsQL("shipper")
});

exports.loadFieldsQL = (receiver, shipper, type = "output") =>({
    id: {
        type: type === "output" ? new GraphQLNonNull(GraphQLID): GraphQLID,
        description: `The uuid of load, automatically generated if not provided`
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
        type:  new GraphQLNonNull( new GraphQLList(receiver) ),
        description: 'List of receivers (receiver: [string])',
    },
    shipper: {
        type: new GraphQLNonNull( new GraphQLList(shipper) ),
        description: 'List of shippers (shipper: [string])',
    },
    commodity: {
        type: GraphQLString,
        description: 'Commodity of the load (commodity: string)',
    },
    hazmat: {
        type: new GraphQLNonNull( GraphQLBoolean ),
        description: 'Is load is hazmat yes or no? (hazmat: boolean)',
    },
    poNumber: {
        type: GraphQLString,
        description: 'Po number (poNumber: string)',
    },
    specialInstructions: {
        type: GraphQLString,
        description: 'Special instructions (specialInstructions: string)',
    },
    state: {
        type: new GraphQLNonNull( GraphQLString ),
        description: 'State (state: string), CREATED | ASSIGNED | MOVING | DELIVERED | PAID',
    },
    trailerNo: {
        type: GraphQLString,
        description: 'Assigned Trailer number (trailerNo: string)',
    },
    totalWeight: {
        type: GraphQLString,
        description: 'Total weight (totalWeight: string)',
    }
});

exports.loadsInputQL = new GraphQLInputObjectType({
    name: "loadModifiedInput",
    description: "Load modified input information",
    fields: this.loadFieldsQL(this.receiverInputQL, this.shipperInputQL, "input")
})

exports.loadsOutputQL = new GraphQLObjectType({
    name: "loadModifiedOutput",
    description: "Loads output information",
    fields: this.loadFieldsQL(this.receiverOutputQL, this.shipperOutputQL)
});