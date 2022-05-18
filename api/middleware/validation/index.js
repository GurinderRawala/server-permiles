const { clientRoutesValidation } = require('./client-routes-validation')

exports.validationMiddleware = ({ userAccountRepo, clientRepo }) =>({
    clientRoutesValidation: clientRoutesValidation.bind(null, userAccountRepo, clientRepo),
    ...require('./validation-error-message')
})