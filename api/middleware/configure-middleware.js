const configurePermissionsMiddleware = require('./permissions')
const { createGetUserRoleById } = require('../../user-account')
const { v4 } = require('uuid')
exports.createConfigureMiddleware = ({ enabled, log, rbac, userAccountRepo, token, uuidRegex }) => {
    const getUserRoleById = createGetUserRoleById( { log, userAccountRepo} )
    const middleware = {
        uuidMiddleware: (req, _, next) => {
            if(req.body.id && req.body.id.match(uuidRegex)) {
                next();
                return
            }
            req.body.id = v4()
            next()
        },
        determineUserRole: (req, res, next) => { 
            if(!enabled) {
                next()
                return  
            }
            const accessToken = req.session?.user?.id || req.headers.Cookie || req.headers?.authorization
            const decodedToken = token.verify(accessToken)

            getUserRoleById(decodedToken?.id, (err, role) => {
                if(err) {
                    const errorMessage = 'An error occurred while determining user role'
                    log.error({err}, errorMessage )
                    return res.status(500).json({ message: errorMessage })
                }
                req.role = role
                req.driverId = decodedToken?.driverId
                req.body.clientid = decodedToken?.clientid
                req.body.userId = decodedToken?.id
                next()
            })
        },
        permissions: configurePermissionsMiddleware({ log, rbac, enabled })
    }

    return middleware
}
