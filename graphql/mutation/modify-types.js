const { graphQLTypes } = require('../types')
const { loadsInputQL } = require('../load')
const { tripInputQL } = require('../trip')

exports.modifyInputTypes = (model) => {
  switch (model) {
    case 'Load':
      return loadsInputQL
    case 'Trip':
      return tripInputQL
    default:
      return graphQLTypes.inputTypes[model]
  }
}
