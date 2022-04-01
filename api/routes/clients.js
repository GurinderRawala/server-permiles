const express = require('express');
const { createAddClient, createUpdateClient, createGetClient } = require('../../clients');
const router = express.Router()

exports.registerRoutes = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions } } = modules
    const permissionCreateClient = permissions('client:create')
    router.post('/clients/create-client', [determineUserRole, permissionCreateClient], (req, res, next) => {
        const addClient = createAddClient(modules)
        addClient(req.body, (err) => {
            if (err) { return next(err) }
            res.sendStatus(201)
            next()
        })
    })
    const permissionUpdateClient = permissions('client:update')
    router.post('/clients/edit-client', [determineUserRole, permissionUpdateClient], (req, res, next) =>{
        const updateClient = createUpdateClient(modules)
        updateClient(req.body, (err) =>{
            if(err) return next(err)
            res.sendStatus(201)
            next()
        })
    })
    const permissionGetClient = permissions('client:retreive')
    router.get('/clients/:id',[determineUserRole, permissionGetClient], (req, res, next) =>{
        const getClient = createGetClient(modules)
        getClient(req.params, (err, client) => {
            if (err) { return next(err) }
            res.status(200).send({data: client})
            next()
        })
    })
    server.use(router)
}