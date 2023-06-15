import {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  Thunk,
  GraphQLInputFieldConfigMap,
  GraphQLFieldConfigMap,
} from 'graphql'

export const truckFields: GraphQLFieldConfigMap<unknown, unknown> = {
  truckNo: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Truck number',
  },
}

export const trailerFields: GraphQLFieldConfigMap<unknown, unknown> = {
  trailerNo: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Trailer number',
  },
  trailerAttributes: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Trailer attributes',
  },
}

export declare type EquipmentCommonFieldsReturn<T extends 'input' | 'output'> =
  T extends 'input'
    ? Thunk<GraphQLInputFieldConfigMap>
    : Thunk<GraphQLFieldConfigMap<any, any, { [key: string]: any }>>

export const equipmentCommonFields = <T extends 'input' | 'output'>(
  equipmentUniqueFields: GraphQLFieldConfigMap<unknown, unknown>,
  type: T
): EquipmentCommonFieldsReturn<T> => ({
  id: {
    type: type === 'output' ? new GraphQLNonNull(GraphQLID) : GraphQLID,
    description: `The uuid of equipment, automatically generated if not provided`,
  },
  model: {
    type: new GraphQLNonNull(GraphQLString),
    description: `Model for equipment`,
  },
  make: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Make of the equipment',
  },
  year: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Year of the equipment',
  },
  vinNumber: {
    type: GraphQLString,
    description: 'VIN number of the equipment',
  },
  licencePlate: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Licence plate of the equipment',
  },
  licenceState: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Licence state of the equipment',
  },
  safetyExpire: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Safety expire date of equipment',
  },
  notes: {
    type: GraphQLString,
    description: 'Any notes related to the equipment',
  },
  ...equipmentUniqueFields,
})

export const truckInputQL = new GraphQLInputObjectType({
  name: 'truckModifiedInput',
  description: 'Truck modified input information',
  fields: equipmentCommonFields<'input'>(truckFields, 'input'),
})

export const truckOutputQL = new GraphQLObjectType({
  name: 'TruckModifiedOutput',
  description: 'Loads output information',
  fields: equipmentCommonFields<'output'>(truckFields, 'output'),
})

export const trailerInputQL = new GraphQLInputObjectType({
  name: 'trailerModifiedInput',
  description: 'Trailer modified input information',
  fields: equipmentCommonFields<'input'>(trailerFields, 'input'),
})

export const trailerOutputQL = new GraphQLObjectType({
  name: 'trailerModifiedOutput',
  description: 'Trailer modified input information',
  fields: equipmentCommonFields<'output'>(trailerFields, 'output'),
})
