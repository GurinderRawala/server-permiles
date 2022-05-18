const { UserAccount, createAddUserAccount } = require("../user-account");

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
    log.info({Client}, 'adding client')
    const res = await clientRepo.create(Client)
    log.info({res}, 'client added')
    callback(null, res)
}

async function getClientById (clientRepo, log, Client, callback) {
    log.info({Client}, 'retrieving client information')
    const res = await clientRepo.findByPk(Client.id)
    log.info({Client}, 'client information retrieved')
    return callback(null, res)
}

async function inviteUser(clientRepo, userAccountRepo, log, mailer, clock, token, user, callback){
    log.info({user}, 'inviting user')
    const addUserAccount = createAddUserAccount({userAccountRepo, log})
    let client = await getClientById(clientRepo, log, {id: user.clientid }, (err, res)=>{
        if(err){
            return callback(err)
        }
        return res
    })
    
    if(!client){
        const error = new Error('client not found')
        return callback(error)
    }

    const inviteUser = UserAccount.createInviteUser(user, client, { clock, token })
    const response = await addUserAccount(inviteUser, (err, response) => {
        if(err){
            return callback(err)
        }
        return response
    })
    const inviteLink = `https://permiles.com/signup?token=${inviteUser.token}`;
    const payload = {
        firstname: inviteUser.firstname,
        company: inviteUser.company,
        inviteLink
    }
    const subject = `${inviteUser.company}- Invitation to join Per Miles`;
    if( response ){
        mailer.send('invite-user.hbs', { to: inviteUser.email, subject, payload})
        callback(null,{message: `${inviteUser.role} has been Invited to join ${payload.company}`})
    }
}
  
module.exports = {
    createAddClient : ({ clientRepo, log  }) => addClient.bind(null, clientRepo, log),
    createUpdateClient : ({ clientRepo, log  }) => updateClient.bind(null, clientRepo, log),
    createGetClient : ({ clientRepo, log  }) => getClientById.bind(null, clientRepo, log ),
    createInviteUser : ({ clientRepo, userAccountRepo, log, mailer, clock, token  }) => inviteUser.bind(null, clientRepo, userAccountRepo, log,    mailer, clock, token )
}