import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLString,
} from 'graphql'
import { CommonFieldsReturn } from '../common-types'

export const brokerFields = <T extends 'input' | 'output'>(
  type: T
): CommonFieldsReturn<T> => ({
  id: {
    type: type === 'output' ? new GraphQLNonNull(GraphQLID) : GraphQLID,
    description: `The uuid of broker, automatically generated if not provided.`,
  },
  name: {
    type: GraphQLString,
    description: 'Name of the broker.',
  },
  streetaddress: {
    type: GraphQLString,
    description: 'Street address of the broker',
  },
  city: {
    type: GraphQLString,
    description: 'City of the broker',
  },
  postalcode: {
    type: GraphQLString,
    description: 'Post code address of broker.',
  },
  province: {
    type: GraphQLString,
    description: 'Province of the broker.',
  },
  country: {
    type: GraphQLString,
    description: 'Country of the broker.',
  },
  email: {
    type: GraphQLString,
    description: 'Email address of the broker.',
  },
  phone: {
    type: GraphQLString,
    description: 'Phone number of the broker',
  },
  contactname: {
    type: GraphQLString,
    description: 'Contact name at the broker`s office',
  },
})

export const brokerInputQL = new GraphQLInputObjectType({
  name: 'brokerModifiedInput',
  description: 'Broker modified input information',
  fields: brokerFields<'input'>('input'),
})

export const brokerOutputQL = new GraphQLObjectType({
  name: 'brokerModifiedOutput',
  description: 'broker output information',
  fields: brokerFields<'output'>('output'),
})
