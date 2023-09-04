import {
  GraphQLFieldConfigMap,
  GraphQLInputFieldConfigMap,
  Thunk,
} from 'graphql'

export declare type CommonFieldsReturn<T extends 'input' | 'output'> =
  T extends 'input'
    ? Thunk<GraphQLInputFieldConfigMap>
    : Thunk<GraphQLFieldConfigMap<any, any, { [key: string]: any }>>
