const { UserAccount } = require("./user-account");

async function updateUserAccount ( userAccountRepo, log, account, callback) {
    let res;
    try{
        log.info({account}, 'updating user account')
        res = await userAccountRepo.update(account, {
            where: {
                id: account.id
            }
        });
        log.info({res}, 'user account updated')
    }catch(err){
        log.error({err}, 'error updating account')
    }
    if( res[0] === 1 ){
        return callback(null, { msg: 'User account has been updated' })
    }
    return callback({msg: 'Error Updating user account'})
}

async function addUserAccount ( userAccountRepo, log, account, callback) {
    log.info({account}, 'adding user account')
    try{
        const res = await userAccountRepo.create(account)
        log.info({res}, 'user account added')
        return callback(null, {msg: `${account.role} account has been created`})
    }catch(err){
        log.error({err}, 'Error adding user account')
        return callback(err)
    }
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
    const updatedUser = await UserAccount.createActiveUserAccount(account, {log, hashingService})
    await updateUserAccount(userAccountRepo, log, updatedUser, (err, res) =>{
        if(err){
            return callback(err)
        }
        callback(null, res)
    })
}
    
async function signUpUserAccount (userAccountRepo, log, token, signupToken, callback) {
    const { id, username, error} = token.verify(signupToken)
    if(error) {
        const error = new Error('Invalid Token')
        return callback(error)
    }
    callback(null, {id, username })
}
  
module.exports = {
    createAddUserAccount : ({ userAccountRepo, log  }) => addUserAccount.bind(null, userAccountRepo, log),
    createUpdateUserAccount : ({ userAccountRepo, log  }) => updateUserAccount.bind(null, userAccountRepo, log),
    createGetUserRoleById : ({ userAccountRepo, log  }) => getUserRoleById.bind(null, userAccountRepo, log ),
    createActivateUserAccount: ({ userAccountRepo, log, hashingService }) => activateUserAccount.bind(null, userAccountRepo, log, hashingService),
    createGetUserAccountById: ({ userAccountRepo, log }) => getUserAccountById.bind(null, userAccountRepo, log),
    createSignUpUserAccount: ({ userAccountRepo, log, token }) => signUpUserAccount.bind(null, userAccountRepo, log, token)
}
