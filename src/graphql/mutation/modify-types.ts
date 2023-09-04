import { graphQLTypes } from '../types'
import { loadsInputQL } from '../load'
import { tripInputQL } from '../trip'
import { trailerInputQL, truckInputQL } from '../equipment'
import { Models } from '../consts'
import { brokerInputQL } from '../broker'

export const modifyInputTypes = (model: Models) => {
  switch (model) {
    case 'Load':
      return loadsInputQL
    case 'Trip':
      return tripInputQL
    case 'Trailer':
      return trailerInputQL
    case 'Truck':
      return truckInputQL
    case 'Broker':
      return brokerInputQL
    default:
      return graphQLTypes.inputTypes[model]
  }
}
