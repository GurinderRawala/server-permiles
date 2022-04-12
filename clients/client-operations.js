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

async function inviteUser(clientRepo, userAccountRepo, log, sendEmail, clock, token, user, callback){
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

    const inviteUser = await UserAccount.createInviteUser(user, client, { clock, token })
    let res = await addUserAccount(inviteUser, (err, res) => {
        if(err){
            return callback(err)
        }
        return res
    })
    //TODO: Use templates for this email
    const template = require('../lib/mailer/templates/invite-user')({email: inviteUser.email, company: inviteUser.company, username: inviteUser.username})
   
    await sendEmail(
        inviteUser.email,
        template.subject,
        template.body
    )
    callback(null, res)
}
  
module.exports = {
    createAddClient : ({ clientRepo, log  }) => addClient.bind(null, clientRepo, log),
    createUpdateClient : ({ clientRepo, log  }) => updateClient.bind(null, clientRepo, log),
    createGetClient : ({ clientRepo, log  }) => getClientById.bind(null, clientRepo, log ),
    createInviteUser : ({ clientRepo, userAccountRepo, log, sendEmail, clock, token  }) => inviteUser.bind(null, clientRepo, userAccountRepo, log, sendEmail, clock, token )
}