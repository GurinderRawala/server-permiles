const { clientRoutesValidation } = require('./client-routes-validation')

exports.validationMiddleware = ({ userAccountRepo }) =>({
    clientRoutesValidation: clientRoutesValidation.bind(null, userAccountRepo),
    ...require('./validation-error-message')
})