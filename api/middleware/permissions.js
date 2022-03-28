const permissions = ({ log, rbac, enabled }) => (permission) => {  
    return async (req, res, next) => {
        if(!enabled) {
            next()
            return  
        } 
          
        const allowed = await rbac.can(req.role, permission)
        if(!allowed) {
            const errorMessage = `You don't have the permission to ${permission}. If you think this is in error, please contact support.`
            const userId = req.session?.user?.id
            log.info({ userId, err: errorMessage })
            return res.status(403).json({ message: errorMessage })
        }
        next()
    }
}

module.exports = permissions
