const express = require('express');
const { createAddClient, createUpdateClient } = require('../../clients');
const router = express.Router()

exports.registerRoutes = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions } } = modules
    const permissionCreateClient = permissions('client:create')
    router.post('/client-accounts/create-client-account', [determineUserRole, permissionCreateClient], (req, res, next) => {
        const addClient = createAddClient(modules)
        addClient(req.body, (err) => {
            if (err) { return next(err) }
            res.sendStatus(201)
            next()
        })
    })
    const permissionUpdateClient = permissions('client:edit')
    router.post('/client-accounts/edit-client-account', [determineUserRole, permissionUpdateClient], (req, res, next) =>{
        const updateClient = createUpdateClient(modules)
        updateClient(req.body, (err) =>{
            if(err) return next(err)
            res.sendStatus(201)
            next()
        })
    })
    server.use(router)
}