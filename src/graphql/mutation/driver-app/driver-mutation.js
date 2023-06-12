const { GraphQLObjectType } = require('graphql')
const { updateTripState } = require('./update-trip-state')
const { updateAssignedLoad } = require('./update-assigned-load')

const registerDriverMutation = (_, modules) =>
  new GraphQLObjectType({
    name: 'driverMutations',
    description: 'Driver app mutations',
    fields: {
      ...driverMutationFields(modules),
    },
  })

const driverMutationFields = (modules) => ({
  ...updateTripState(modules),
  ...updateAssignedLoad(modules),
})

module.exports = {
  driverMutationFields,
  registerDriverMutation,
}
