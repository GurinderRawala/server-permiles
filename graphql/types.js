const { generateModelTypes } = require("graphql-sequelize-generator")
const models = require("../lib/models")

module.exports.graphQLTypes = generateModelTypes(models)