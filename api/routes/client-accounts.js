const express = require('express');
const { createAddClientAccount, createEditClientAccount } = require('../../client-account');
const router = express.Router()

exports.registerRoutes = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions } } = modules
    const permissionCreateClientAccount = permissions('super-user:create')
    router.post('/client-accounts/create-client-account', [determineUserRole, permissionCreateClientAccount], (req, res, next) => {
        const addClientAccount = createAddClientAccount(modules)
        addClientAccount(req.body, (err) => {
            if (err) { return next(err) }
            res.sendStatus(201)
            next()
        })
    })
    const permissionEditClientAccount = permissions('super-user:edit')
    router.post('/client-accounts/edit-client-account', [determineUserRole, permissionEditClientAccount], (req, res, next) =>{
        const editClientAccount = createEditClientAccount(modules)
        editClientAccount(req.body, (err) =>{
            if(err) return next(err)
            res.sendStatus(201)
            next()
        })
    })
    server.use(router)
}