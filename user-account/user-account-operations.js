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
    const { id, username, error } = token.verify(signupToken)
    if(error) {
        const error = new Error('Invalid Token')
        return callback(error)
    }
    callback(null, {id, username })
}

async function findUserAccountByEmail (userAccountRepo, log, account, callback){
    log.info({ email: account.email }, 'finding user with email')
    const res = await userAccountRepo.findAll({ where:{ email: account.email } })
    log.info({res}, "User information")
    return callback(null, res)
}
async function signinUserAccount ( userAccountRepo, log, hashingService, token, account, callback ){
    const user  = await findUserAccountByEmail(userAccountRepo, log, account, (err, res) =>{
        if(err){ return callback(err) }
        return res[0]
    })
    const payload = { password: account.password, hashedPassword: user.password }
    const verify = await UserAccount.createSigninUserAccount(payload, { hashingService, log })
    if( !verify ){
        return callback({ msg: 'wrong email or password'})
    }
    const accessToken = token.create({ id: user.id, email: user.email, clientid: user.clientid }, {  expiresIn: '48h' })
    callback(null, accessToken)
}
  
module.exports = {
    createAddUserAccount : ({ userAccountRepo, log  }) => addUserAccount.bind(null, userAccountRepo, log),
    createUpdateUserAccount : ({ userAccountRepo, log  }) => updateUserAccount.bind(null, userAccountRepo, log),
    createGetUserRoleById : ({ userAccountRepo, log  }) => getUserRoleById.bind(null, userAccountRepo, log ),
    createActivateUserAccount: ({ userAccountRepo, log, hashingService }) => activateUserAccount.bind(null, userAccountRepo, log, hashingService),
    createGetUserAccountById: ({ userAccountRepo, log }) => getUserAccountById.bind(null, userAccountRepo, log),
    createSignUpUserAccount: ({ userAccountRepo, log, token }) => signUpUserAccount.bind(null, userAccountRepo, log, token),
    createSigninUserAccount: ({ userAccountRepo, log, hashingService, token }) => signinUserAccount.bind(null, userAccountRepo, log, hashingService, token)
}
