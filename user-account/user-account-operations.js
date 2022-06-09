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
    const { id, email, error } = token.verify(signupToken)
    if(error) {
        return callback({msg: 'Token has been expired, contact support to signup.'})
    }
    callback(null, {id, email})
}

async function findUserAccountByEmail (userAccountRepo, log, account, callback){
    log.info({ email: account.email }, 'finding user with email')
    const res = await userAccountRepo.findOne({ where:{ email: account.email } })
    log.info({res}, "User information")
    return callback(null, res)
}
async function signinUserAccount ( userAccountRepo, log, hashingService, token, account, callback ){
    const user  = await findUserAccountByEmail(userAccountRepo, log, account, (err, res) =>{
        if(err){ return callback(err) }
        return res
    })
    const payload = { password: account.password, hashedPassword: user.password }
    const verify = await UserAccount.createSigninUserAccount(payload, { hashingService, log })
    if( !verify ){
        return callback({ msg: 'wrong email or password'})
    }
    const accessToken = token.create({ id: user.id, email: user.email, clientid: user.clientid }, {  expiresIn: '24h' })
    callback(null, accessToken)
}

async function resetPasswordUserAccount( userAccountRepo, log, mailer, token, user, callback){
    log.info({user}, 'user requesting for password reset')
    const userInfo = await findUserAccountByEmail(userAccountRepo, log, user, (err, info) =>{
        if(err) { return callback(err) }
        return info
    })
    const accessToken = token.create({ 
        id: userInfo.id, 
        email: userInfo.email, clientid: userInfo.clientid }, 
    {  expiresIn: '1h' })
    const payload = {
        firstname: userInfo.firstname,
        resetLink: accessToken
    }
    const subject = `Reset Password for Per Miles User Account`
    mailer.send('reset-password.hbs', { to: userInfo.email, subject, payload })
    callback(null, { msg: `Reset password request is sent to your email` })
}
  
module.exports = {
    createAddUserAccount : ({ userAccountRepo, log  }) => addUserAccount.bind(null, userAccountRepo, log),
    createUpdateUserAccount : ({ userAccountRepo, log  }) => updateUserAccount.bind(null, userAccountRepo, log),
    createGetUserRoleById : ({ userAccountRepo, log  }) => getUserRoleById.bind(null, userAccountRepo, log ),
    createActivateUserAccount: ({ userAccountRepo, log, hashingService }) => activateUserAccount.bind(null, userAccountRepo, log, hashingService),
    createGetUserAccountById: ({ userAccountRepo, log }) => getUserAccountById.bind(null, userAccountRepo, log),
    createSignUpUserAccount: ({ userAccountRepo, log, token }) => signUpUserAccount.bind(null, userAccountRepo, log, token),
    createSigninUserAccount: ({ userAccountRepo, log, hashingService, token }) => signinUserAccount.bind(null, userAccountRepo, log, hashingService, token),
    createResetPasswordUserAccount: ({ userAccountRepo, log, mailer, token }) => resetPasswordUserAccount.bind(null, userAccountRepo, log, mailer, token)
}
