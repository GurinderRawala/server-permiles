const { GraphQLList, GraphQLString } = require("graphql");
const { graphQLTypes } = require("../types");
const { MODEL_REPO } = require("../consts");
const { get, camelCase } = require("lodash");
const createWhereCondition = (ctx) => ({ where:{ clientid: ctx.clientid } })

const queryDataFields = (resolver) => MODEL_REPO.map(({ model, repo }) =>({
    [`${camelCase(model)}s`]: {
        type: new GraphQLList(get(graphQLTypes, `outputTypes.${model}`)),
        resolve: async(_, args, context) => await resolver.findAll(
            repo, createWhereCondition(context.body))
    }
})).reduce(( obj, _, index, arr) => {
    return { ...obj, ...arr[index] }
},{})


const argsForPk = {
    id:{
        type: GraphQLString,
        description: "Primary repo to find Data"
    }
};

const queryByPk = (resolver) => MODEL_REPO.map(({ model, repo }) => ({
    [camelCase(`find${model}`)]: {
        type: get(graphQLTypes, `outputTypes.${model}`),
        args: argsForPk,
        resolve: async(_, args) => await resolver.findByPk(repo, args.id)
    }
})).reduce(( obj, _, index, arr) => {
    return { ...obj, ...arr[index] }
},{})

module.exports = {
    queryByPk,
    queryDataFields
}