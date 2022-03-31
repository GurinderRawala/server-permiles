async function updateClient ( clientRepo, log, Client, callback) {
    log.info({Client}, 'updating client')
    const res = await clientRepo.update(Client, {
        where: {
            id: Client.id
        }
    });
    log.info({res}, 'client updated')
    callback(null, res)
}

async function addClient ( clientRepo, log, Client, callback) {
    log.info({Client}, 'adding client account')
    const res = await clientRepo.create(Client)
    log.info({res}, 'client account added')
    callback(null, res)
}

async function getClientById (clientRepo, log, Client, callback) {
    log.info({Client}, 'retrieving client information')
    const res = await clientRepo.findByPk(Client.id)
    log.info({Client}, 'client information retrieved')
    callback(null, res)
}
  
module.exports = {
    createAddClient : ({ clientRepo, log  }) => addClient.bind(null, clientRepo, log),
    createUpdateClient : ({ clientRepo, log  }) => updateClient.bind(null, clientRepo, log),
    createGetClient : ({ clientRepo, log  }) => getClientById.bind(null, clientRepo, log )
}