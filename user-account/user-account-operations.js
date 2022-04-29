const { UserAccount } = require("./user-account");

async function updateUserAccount ( userAccountRepo, log, account, callback) {
    try{
        log.info({account}, 'updating user account')
        const res = await userAccountRepo.update(account, {
            where: {
                id: account.id
            }
        });
        log.info({res}, 'user account updated')
        callback(null, res)
    }catch(err){
        log.error({err}, 'error updating account')
        const error = new Error(err)
        callback(error)
    }
}

async function addUserAccount ( userAccountRepo, log, account, callback) {
    log.info({account}, 'adding user account')
    const res = await userAccountRepo.create(account)
    log.info({res}, 'user account added')
    callback(null, res)
}

async function getUserRoleById (userAccountRepo, log, userId, callback) {
    const res = await userAccountRepo.findByPk(userId)
    callback(null, res?.role)
}

async function getUserAccountById (userAccountRepo, log, userId, callback){
    log.info({userAccountRepo}, 'retrieving User information')
    const res = await userAccountRepo.findByPk(userId)
    log.info({userAccountRepo}, 'User information retrieved')
    return callback(null, res)
}

async function activateUserAccount (userAccountRepo, log, hashingService, account, callback) {
    const validatePassword = UserAccount.validatePassword (account, { log })
    if( validatePassword.err ){
        return callback(validatePassword.msg)
    }
    const updatedUser = await UserAccount.createActiveUserAccount(account, {log, hashingService})
    await updateUserAccount(userAccountRepo, log, updatedUser, (err, res) =>{
        if(err){
            return callback(err)
        }
        callback(null, res)
    })
    
}
  
module.exports = {
    createAddUserAccount : ({ userAccountRepo, log  }) => addUserAccount.bind(null, userAccountRepo, log),
    createUpdateUserAccount : ({ userAccountRepo, log  }) => updateUserAccount.bind(null, userAccountRepo, log),
    createGetUserRoleById : ({ userAccountRepo, log  }) => getUserRoleById.bind(null, userAccountRepo, log ),
    createActivateUserAccount: ({ userAccountRepo, log, hashingService }) => activateUserAccount.bind(null, userAccountRepo, log, hashingService),
    createGetUserAccountById: ({ userAccountRepo, log }) => getUserAccountById.bind(null, userAccountRepo, log)
}
  
