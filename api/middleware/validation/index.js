const expressValidator = require('express-validator')
const { clientRoutesValidation } = require('./routes/client-routes-validation')
const { driverRoutesValidation } = require('./routes/driver-routes-validation')
const { userAccountValidation } = require('./routes/user-account-validation')
const { brokerRoutesValidation } = require('./routes/broker-routes-validation')
const { loadRoutesValidation } = require('./routes/load-routes-validation')
const { tripRoutesValidation } = require('./routes/trip-routes-validation')
exports.validationMiddleware = ({ userAccountRepo, clientRepo, driverRepo, brokerRepo, loadRepo, tripRepo }) =>({
    clientRoutesValidation: clientRoutesValidation.bind(null, userAccountRepo, clientRepo, expressValidator),
    userAccountValidation: userAccountValidation.bind(null, expressValidator, userAccountRepo),
    driverRoutesValidation: driverRoutesValidation.bind(null, expressValidator, driverRepo, clientRepo),
    brokerRoutesValidation: brokerRoutesValidation.bind(null, expressValidator, brokerRepo, clientRepo),
    loadRoutesValidation: loadRoutesValidation.bind(null, expressValidator, loadRepo, clientRepo, brokerRepo),
    tripRoutesValidation: tripRoutesValidation.bind(null, expressValidator, tripRepo, clientRepo, driverRepo),
    ...require('./validation-error-message')
})