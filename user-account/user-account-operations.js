async function updateUserAccount ( userAccountRepo, log, userAccount, callback) {
    log.info({userAccount}, 'updating user account')
    const res = await userAccountRepo.update(userAccount, {
        where: {
            id: userAccount.id
        }
    });
    log.info({res}, 'user account updated')
    callback(null, res)
}

async function addUserAccount ( userAccountRepo, log, userAccount, callback) {
    log.info({userAccount}, 'adding user account')
    const res = await userAccountRepo.create(userAccount)
    log.info({res}, 'user account added')
    callback(null, res)
}

async function getUserRoleById (userAccountRepo, log, userId, callback) {
    const res = await userAccountRepo.findByPk(userId)
    callback(null, res?.role)
}

async function findUserAccount (userAccountRepo, log, userId, callback){
    log.info({userAccountRepo}, 'retrieving User information')
    const res = await userAccountRepo.findByPk(userId)
    log.info({userAccountRepo}, 'User information retrieved')
    return callback(null, res)
}

async function activateUserAccount (userAccountRepo, log, hash, userAccount, callback) {
    const { id, password, confirmPassword } = userAccount
    const user = await findUserAccount(userAccountRepo, log, id, (err, res) =>{
        if(err){
            log.error({err}, "user account is not found")
            return callback(err)
        }
        return res
    })
    if( !user ){
        const error = new Error('User not found')
        return callback(error)
    }
    if(password !== confirmPassword){
        const error = new Error('Invalid confirm Password')
        return callback(error)
    }
    const hashedPassword = await hash.hashPassword(password, ( err, results) =>{
        if(err){
            return callback(err)
        }
        return results
    })
    const updatedUser = {
        ...user.dataValues,
        password: hashedPassword,
        active: true,
        awaitingSignup: false
    }

    const res = await updateUserAccount(userAccountRepo, log, updatedUser, (err, res) =>{
        if(err){
            return callback(err)
        }
        return res
    })
    callback(null, res)
}
  
module.exports = {
    createAddUserAccount : ({ userAccountRepo, log  }) => addUserAccount.bind(null, userAccountRepo, log),
    createUpdateUserAccount : ({ userAccountRepo, log  }) => updateUserAccount.bind(null, userAccountRepo, log),
    createGetUserRoleById : ({ userAccountRepo, log  }) => getUserRoleById.bind(null, userAccountRepo, log ),
    createActivateUserAccount: ({ userAccountRepo, log, hash }) => activateUserAccount.bind(null, userAccountRepo, log, hash),
    createFindUserAccount: ({ userAccountRepo, log }) => findUserAccount.bind(null, userAccountRepo, log)
}
  
