async function editClientAccount ( clientAccountRepo, log, editQuery, callback) {
    log.info({editQuery}, 'updating client')
    const res = await clientAccountRepo.update(editQuery, {
        where: {
            id: editQuery.id
        }
    });
    log.info({res}, 'client updated')
    callback(null, res)
}

async function addClientAccount ( clientAccountRepo, log, clientAccount, callback) {
    log.info({clientAccount}, 'adding client account')
    const res = await clientAccountRepo.create(clientAccount)
    // log.info({res}, 'client account added')
    callback(null, res)
}

async function getClientById (clientAccountRepo, log, clientAccount, callback) {
    log.info({clientAccount}, 'get a client account')
    const res = await clientAccountRepo.findByPk(clientAccount.id)
    log.info({clientAccount}, 'client information retrieved')
    callback(null, res)
}
  
module.exports = {
    createAddClientAccount : ({ clientAccountRepo, log  }) => addClientAccount.bind(null, clientAccountRepo, log),
    createEditClientAccount : ({ clientAccountRepo, log  }) => editClientAccount.bind(null, clientAccountRepo, log),
    createGetClientById : ({ clientAccountRepo, log  }) => getClientById.bind(null, clientAccountRepo, log )
}