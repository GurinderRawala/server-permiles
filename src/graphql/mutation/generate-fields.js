const { camelCase, get } = require('lodash')
const { GraphQLString } = require('graphql')
const { MODEL_REPO } = require('../consts')
const { graphQLTypes } = require('../types')
const { modifyInputTypes } = require('./modify-types')

const generateCreateMutation = (resolver) =>
  MODEL_REPO.map(({ model, repo }) => ({
    [camelCase(`add${model}`)]: {
      type: get(graphQLTypes, `outputTypes.${model}`),
      args: {
        input: {
          type: modifyInputTypes(model),
          description: `${model} input values`,
        },
      },
      resolve: async (_, args, ctx) => {
        const payload = {
          ...args.input,
          clientid: ctx.body.clientid,
          id: ctx.body.id || args.id,
        }
        return await resolver.create(repo, payload)
      },
    },
  })).reduce((obj, _, index, arr) => {
    return { ...obj, ...arr[index] }
  }, {})

const generateUpdateMutation = (resolver) =>
  MODEL_REPO.map(({ model, repo }) => ({
    [camelCase(`update${model}`)]: {
      type: get(graphQLTypes, `outputTypes.${model}`),
      args: {
        input: {
          type: modifyInputTypes(model),
          description: `${model} input values`,
        },
        id: {
          type: GraphQLString,
          description: 'update where id match',
        },
      },
      resolve: async (_, args) =>
        await resolver.update(repo, {
          data: args.input,
          condition: { where: { id: args.id } },
        }),
    },
  })).reduce((obj, _, index, arr) => {
    return { ...obj, ...arr[index] }
  }, {})

module.exports = {
  generateCreateMutation,
  generateUpdateMutation,
}
