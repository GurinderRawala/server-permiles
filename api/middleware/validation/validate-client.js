const { check } = require('express-validator')
exports.validateClient = (clientRepo) => {
  const clientValidation = check('clientid', 'Invalid client UUID')
    .trim()
    .isUUID()
    .custom((value) =>
      clientRepo.findOne({ where: { id: value } }).then((client) => {
        if (!client) {
          return Promise.reject(`Client is not found`)
        }
      })
    )
  return clientValidation
}
