const expressValidator = require('express-validator')
const { clientRoutesValidation } = require('./routes/client-routes-validation')
const { driverRoutesValidation } = require('./routes/driver-routes-validation')
const { userAccountValidation } = require('./routes/user-account-validation')
const { brokerRoutesValidation } = require('./routes/broker-routes-validation')
const { loadRoutesValidation } = require('./routes/load-routes-validation')
const { tripRoutesValidation } = require('./routes/trip-routes-validation')
const { truckRoutesValidation } = require('./routes/truck-routes-validation')
const { trailerRoutesValidation } = require('./routes/trailer-routes-validation')
const { fileRoutesValidation } = require('./routes/file-routes-validation')
exports.validationMiddleware = ({ userAccountRepo, clientRepo, driverRepo, 
    brokerRepo, loadRepo, tripRepo, truckRepo, trailerRepo  
}) =>({
    clientRoutesValidation: clientRoutesValidation.bind(null, userAccountRepo, clientRepo, expressValidator),
    userAccountValidation: userAccountValidation.bind(null, expressValidator, userAccountRepo),
    driverRoutesValidation: driverRoutesValidation.bind(null, expressValidator, driverRepo, clientRepo),
    brokerRoutesValidation: brokerRoutesValidation.bind(null, expressValidator, brokerRepo, clientRepo),
    loadRoutesValidation: loadRoutesValidation.bind(null, expressValidator, loadRepo, clientRepo, brokerRepo),
    tripRoutesValidation: tripRoutesValidation.bind(null, expressValidator, tripRepo, clientRepo, driverRepo),
    truckRoutesValidation: truckRoutesValidation.bind(null, expressValidator, truckRepo, clientRepo),
    trailerRoutesValidation: trailerRoutesValidation.bind(null, expressValidator, trailerRepo, clientRepo),
    fileRoutesValidation: fileRoutesValidation.bind(null, expressValidator, clientRepo),
    ...require('./validation-error-message')
})