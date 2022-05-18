const express = require('express');
const { createAddClient, createUpdateClient, createGetClient, createInviteUser } = require('../../clients');
const router = express.Router()

exports.registerRoutes = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions }, sessionHandler, validation } = modules
    const { clientRoutesValidation } = validation
    const permissionCreateClient = permissions('client:create')
    router.post('/clients/create-client', [sessionHandler, determineUserRole, permissionCreateClient], (req, res, next) => {
        const addClient = createAddClient(modules)
        addClient(req.body, (err) => {
            if (err) { return next(err) }
            res.sendStatus(201)
            next()
        })
    })
    const permissionUpdateClient = permissions('client:update')
    router.post('/clients/update-client', [sessionHandler, determineUserRole, permissionUpdateClient], (req, res, next) =>{
        const updateClient = createUpdateClient(modules)
        updateClient(req.body, (err) =>{
            if(err) return next(err)
            res.sendStatus(201)
            next()
        })
    })
    
    const permissionGetClient = permissions('client:retreive')
    router.get('/clients/:id',[sessionHandler, determineUserRole, permissionGetClient], (req, res, next) =>{
        const getClient = createGetClient(modules)
        getClient(req.params, (err, client) => {
            if (err) { return next(err) }
            res.status(200).send({data: client})
            next()
        })
    })

    const permissionInviteUser = permissions('client:invite-user')
    router.post('/clients/invite-user', 
        [sessionHandler, determineUserRole, permissionInviteUser, clientRoutesValidation('invite-user')],
        (req, res, next) => {
            const { validationErrorMessage } = validation
            const errors = validationErrorMessage(req, res)
            if ( errors ) {
                return next(errors)
            }
            const inviteUser = createInviteUser(modules)
            inviteUser(req.body, (err, resp) => {
                if (err) { 
                    res.status(500)
                    return next(err) 
                }
                res.status(200)
                next(resp)
            })
        })
    server.use(router)
}