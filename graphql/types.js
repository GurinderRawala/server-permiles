const { generateModelTypes } = require("graphql-sequelize-generator")
const models = require("../lib/models")

/**
 * This module provides raw graphql types for the sequelize models. 
 */
module.exports.graphQLTypes = generateModelTypes(models)