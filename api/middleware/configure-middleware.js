const configurePermissionsMiddleware = require('./permissions')
const { createGetUserRoleById } = require('../../user-account')

exports.createConfigureMiddlewares = ({ enabled, log, rbac, userAccountRepo }) => {
    const getUserRoleById = createGetUserRoleById( { log, userAccountRepo} )
    const middlewares = {
        determineUserRole: (req, res, next) => { 
            if(!enabled) {
                next()
                return  
            } 
            getUserRoleById(req.cookies?.userId, (err, role) => {
                if(err) {
                    const errorMessage = 'An error occured while determing user role'
                    log.error({err}, errorMessage )
                    return res.status(500).json({ message: errorMessage })
                }
                req.role = role
                next()
            })
        },
        permissions: configurePermissionsMiddleware({log, rbac, enabled })
    }

    return middlewares
}
