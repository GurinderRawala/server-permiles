const { Op } = require('sequelize')
async function addBroker(brokerRepo, log, broker, callback) {
  try {
    const res = await brokerRepo.create(broker)
    log.info({ res }, 'broker added')
    return callback(null, { msg: 'Broker has been added' })
  } catch (err) {
    log.error({ err }, 'Error creating Broker')
    callback(err)
  }
}

async function updateBroker(brokerRepo, log, broker, callback) {
  try {
    const res = await brokerRepo.update(broker, { where: { id: broker.id } })
    log.info({ res }, 'response after update')
    if (res[0] === 1) {
      return callback(null, { msg: 'Broker has been updated' })
    }
    return callback({ msg: 'Error updating broker' })
  } catch (err) {
    log.error({ err }, 'Error updating Broker')
    callback(err)
  }
}

async function getBrokerList(brokerRepo, log, { clientid }, callback) {
  try {
    const brokers = await brokerRepo.findAll({ where: { clientid } })
    log.info({ brokers }, 'list of brokers')
    return callback(null, brokers)
  } catch (err) {
    log.error({ err }, 'error getting broker list')
    callback(err)
  }
}

async function getBrokerByName(brokerRepo, log, broker, callback) {
  try {
    const brokers = await brokerRepo.findAll({
      where: {
        clientid: broker.clientid,
        [Op.and]: {
          name: broker.name,
        },
      },
    })
    log.info({ brokers }, 'list of brokers found by Name')
    if (brokers.length === 0) {
      return callback({ msg: `No broker found by name: ${broker.name}` })
    }
    return callback(null, brokers)
  } catch (err) {
    log.error({ err }, 'error getting broker list')
    return callback(err)
  }
}

module.exports = {
  createAddBroker: ({ brokerRepo, log }) =>
    addBroker.bind(null, brokerRepo, log),
  createUpdateBroker: ({ brokerRepo, log }) =>
    updateBroker.bind(null, brokerRepo, log),
  createGetBrokerList: ({ brokerRepo, log }) =>
    getBrokerList.bind(null, brokerRepo, log),
  createGetBrokerByName: ({ brokerRepo, log }) =>
    getBrokerByName.bind(null, brokerRepo, log),
}
