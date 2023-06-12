const { GraphQLList } = require('graphql')
const { graphQLTypes } = require('../types')
const { createCommonArgs, createWhereCondition } = require('./utils')
exports.clientQueryField = (resolver) => ({
  clients: {
    type: new GraphQLList(graphQLTypes.outputTypes.Client),
    args: createCommonArgs(graphQLTypes.inputTypes.Client),
    resolve: async (_, args, ctx) => {
      if (ctx.role !== 'superAdmin') {
        return 'Access denied'
      }
      return await resolver.findAll(
        'clientRepo',
        createWhereCondition(ctx, args)
      )
    },
  },
})
