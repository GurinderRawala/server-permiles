const expressValidator = require('express-validator')
const { clientRoutesValidation } = require('./routes/client-routes-validation')
const { driverRoutesValidation } = require('./routes/driver-routes-validation')
const { userAccountValidation } = require('./routes/user-account-validation')

exports.validationMiddleware = ({ userAccountRepo, clientRepo, driverRepo }) =>({
    clientRoutesValidation: clientRoutesValidation.bind(null, userAccountRepo, clientRepo, expressValidator),
    userAccountValidation: userAccountValidation.bind(null, expressValidator, userAccountRepo),
    driverRoutesValidation: driverRoutesValidation.bind(null, expressValidator, driverRepo, clientRepo),
    ...require('./validation-error-message')
})