const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
} = require('graphql')

const { loadsOutputQL } = require('../../load')
const { mapToJSONparse } = require('../utils')

const updateAssignedLoad = ({ log, loadRepo }) => ({
  reportArrivalOrDepart: {
    type: loadsOutputQL,
    args: {
      input: {
        type: new GraphQLNonNull(reportArrivalOrDepartInput),
        description: 'Report arrival or departure by StopID',
      },
      loadID: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'Load uuid which is updating',
      },
      stopID: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'stop id which is updating',
      },
    },

    resolve: async (_, args) => {
      const { loadID, input, stopID } = args
      const { dataValues } = await loadRepo.findByPk(loadID)
      const load = mapToJSONparseLoad(dataValues)
      const adaptableInput = {
        ...load,
        shipper: findAndUpdateArrivalOrDepart(load.shipper, stopID, input),
        receiver: findAndUpdateArrivalOrDepart(load.receiver, stopID, input),
      }
      try {
        const updatedLoad = await loadRepo.update(adaptableInput, {
          where: { id: loadID },
        })

        if (updatedLoad[0] === 1) {
          const { dataValues } = await loadRepo.findByPk(loadID)
          return mapToJSONparseLoad(dataValues)
        }

        throw new Error('Unable to update arrival or departure')
      } catch (err) {
        log.error({ err }, 'Error loading')
        throw new Error(err)
      }
    },
  },
})

const reportArrivalOrDepartInput = new GraphQLInputObjectType({
  name: 'reportArrivalOrDepartInput',
  description: 'Arrival or departure timestamp input',
  fields: {
    arrival: {
      type: GraphQLString,
      description: 'Arrival timestamp',
    },
    depart: {
      type: GraphQLString,
      description: 'Depart timestamp',
    },
  },
})

const findAndUpdateArrivalOrDepart = (list, id, update) => {
  const select = list.find(({ stopID }) => stopID === id)

  if (!select) {
    return list
  }

  return [
    ...list.filter(({ stopID }) => stopID !== id),
    {
      ...select,
      ...update,
    },
  ]
}

const mapToJSONparseLoad = (load) => ({
  ...load,
  shipper: load.shipper.map(mapToJSONparse),
  receiver: load.receiver.map(mapToJSONparse),
})

module.exports = {
  updateAssignedLoad,
}
