module.exports.createAddUserAccount =  ({ userAccountRepo, log}) => {
    const createAddUserAccount = addUserAccount.bind(null, userAccountRepo, log)
    return createAddUserAccount
  }
module.exports.createEditUserAccount = ({ userAccountRepo, log  }) =>{
   const createEditUserAccount =  editUserAccount.bind(null, userAccountRepo, log)
   return createEditUserAccount
}

async function editUserAccount ( userAccountRepo, log, editQuery, callback) {
    log.info({editQuery}, 'updating driver')
    const res = await userAccountRepo.update(editQuery, {
      where: {
        id: editQuery.id
      }
    });
    log.info({res}, 'driver updated')
    callback(null, res)
}

async function addUserAccount ( userAccountRepo, log, userAccount, callback) {
    log.info({userAccount}, 'adding user account')
    const res = await userAccountRepo.create(userAccount)
    log.info({res}, 'user account added')
    callback(null, res)
  }