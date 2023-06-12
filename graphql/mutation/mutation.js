const { GraphQLObjectType } = require('graphql')
const { Resolver } = require('../resolvers')
const { clientMutationField } = require('./client-mutation')
const {
  generateCreateMutation,
  generateUpdateMutation,
} = require('./generate-fields')
module.exports.registerMutation = (_, modules) => {
  const resolver = new Resolver(modules)
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Mutating data',
    fields: {
      ...generateCreateMutation(resolver),
      ...generateUpdateMutation(resolver),
      ...clientMutationField(resolver),
    },
  })

  return mutation
}
