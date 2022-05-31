const configurePermissionsMiddleware = require('./permissions')
const { createGetUserRoleById } = require('../../user-account')

exports.createConfigureMiddlewares = ({ enabled, log, rbac, userAccountRepo, token }) => {
    const getUserRoleById = createGetUserRoleById( { log, userAccountRepo} )
    const middlewares = {
        determineUserRole: (req, res, next) => { 
            if(!enabled) {
                next()
                return  
            }
            const accessToken = req.session?.user?.id
            const decodedToken = token.verify(accessToken)
            getUserRoleById(decodedToken?.id, (err, role) => {
                if(err) {
                    const errorMessage = 'An error occured while determing user role'
                    log.error({err}, errorMessage )
                    return res.status(500).json({ message: errorMessage })
                }
                req.role = role
                req.body.clientid = decodedToken?.clientid
                req.body.userId = decodedToken?.id
                next()
            })
        },
        permissions: configurePermissionsMiddleware({log, rbac, enabled })
    }

    return middlewares
}
