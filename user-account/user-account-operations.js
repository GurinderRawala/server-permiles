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

async function getUserRoleId (userAccountRepo, log, userId, callback) {
  const res = await userAccountRepo.findByPk(userId)
  callback(null, res.role)
}
  
module.exports = {
    createAddUserAccount : ({ userAccountRepo, log  }) => addUserAccount.bind(null, userAccountRepo, log),
    createEditUserAccount : ({ userAccountRepo, log  }) => editUserAccount.bind(null, userAccountRepo, log),
    createGetUserRoleById : ({ userAccountRepo, log  }) => getUserRoleId.bind(null, userAccountRepo, log )
  }
  
