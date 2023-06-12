const { GraphQLObjectType } = require('graphql')
const { Resolver } = require('../resolvers')
const { clientQueryField } = require('./client-query')
const { generateQueryFields } = require('./query-fields')

module.exports.registerQuery = (_, modules) => {
  const resolver = new Resolver(modules)
  const query = new GraphQLObjectType({
    name: 'Query',
    description: 'Query data from graphql',
    fields: {
      ...generateQueryFields(resolver),
      ...clientQueryField(resolver),
    },
  })

  return query
}
