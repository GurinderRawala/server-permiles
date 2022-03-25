module.exports.createAddUserAccount =  ({ userAccountRepo, log}) => {
    const createAddUserAccount = addUserAccount.bind(null, userAccountRepo, log)
    return createAddUserAccount
  }

async function addUserAccount ( userAccountRepo, log, userAccount, callback) {
    log.info({userAccount}, 'adding user account')
    const res = await userAccountRepo.create(userAccount)
    log.info({res}, 'user account added')
    callback(null, res)
  }