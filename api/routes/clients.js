const express = require('express');
const { createAddClient, createUpdateClient, createGetClient, createInviteUser } = require('../../clients');
const router = express.Router()

exports.registerRoutes = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions }, sessionHandler, validation } = modules
    const { clientRoutesValidation } = validation
    const permissionCreateClient = permissions('client:create')
    const validationCreateClient = clientRoutesValidation('client:create')
    router.post('/clients/create-client', 
        [sessionHandler, determineUserRole, permissionCreateClient, validationCreateClient], 
        (req, res, next) => {
            const { validationErrorMessage } = validation
            if( validationErrorMessage(req, res, next) ) return
            const addClient = createAddClient(modules)
            addClient(req.body, (err, msg) => {
                if (err) { return next(err) }
                res.status(201).send(msg)
                next()
            })
        })
    const permissionUpdateClient = permissions('client:update')
    const validationUpdateClient = clientRoutesValidation('client:update')
    router.post('/clients/update-client', 
        [sessionHandler, determineUserRole, permissionUpdateClient, validationUpdateClient], 
        (req, res, next) =>{
            const { validationErrorMessage } = validation
            if( validationErrorMessage(req, res, next) ) return
            const updateClient = createUpdateClient(modules)
            updateClient(req.body, (err, msg) =>{
                if(err){ return next(err) }
                res.status(201).send(msg)
                next()
            })
        })
    
    const permissionGetClient = permissions('client:retreive')
    const validationGetClient = clientRoutesValidation('client:retreive')
    router.get('/clients/:id',
        [sessionHandler, determineUserRole, permissionGetClient, validationGetClient], 
        (req, res, next) =>{
            const { validationErrorMessage } = validation
            if( validationErrorMessage(req, res, next) ) return
            const getClient = createGetClient(modules)
            getClient(req.params, (err, client) => {
                if (err) { 
                    res.status(500)
                    return next(err) 
                }
                res.status(200).send({ ...client })
                next()
            })
        })

    const permissionInviteUser = permissions('client:invite-user')
    const validationInviteUser = clientRoutesValidation('client:invite-user')
    router.post('/clients/invite-user', 
        [sessionHandler, determineUserRole, permissionInviteUser, validationInviteUser],
        (req, res, next) => {
            const { validationErrorMessage } = validation
            if ( validationErrorMessage(req, res, next) ) return
            const inviteUser = createInviteUser(modules)
            inviteUser(req.body, (err, resp) => {
                if (err) { return next(err) }
                res.status(200)
                next(resp)
            })
        })
    server.use(router)
}