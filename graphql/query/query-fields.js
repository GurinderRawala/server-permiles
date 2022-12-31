const { GraphQLList } = require("graphql");
const { graphQLTypes } = require("../types");
const { get, camelCase } = require("lodash");
const { createWhereCondition, createCommonArgs } = require("./utils");
const { MODEL_REPO } = require("../consts");

exports.generateQueryFields = (resolver, referenceModel = MODEL_REPO) => referenceModel.map(({ model, repo }) =>({
    [`${camelCase(model)}s`]: {
        type: new GraphQLList(get(graphQLTypes, `outputTypes.${model}`)),
        args: {
            ...createCommonArgs(get(graphQLTypes, `inputTypes.${model}`))
        },
        resolve: async(_, args, ctx) => await resolver.findAll(repo, createWhereCondition(ctx, args))
    }
})).reduce(( obj, _, index, arr) => {
    return { ...obj, ...arr[index] }
},{})
