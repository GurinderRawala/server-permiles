const express = require('express');
const { createAddUserAccount, createEditUserAccount } = require('../../user-account');
const router = express.Router()

exports.registerRoutes = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions } } = modules
    const permissionCreateUserAccount = permissions('user-account:create')
    router.post('/user-accounts/create-user-account',[determineUserRole, permissionCreateUserAccount], (req, res, next) => {
        const addUserAccount = createAddUserAccount(modules)
        addUserAccount(req.body, (err) => {
            if (err) { return next(err) }
            res.sendStatus(201)
            next()
        })
    })
    const permissionEditUserAccount = permissions('user-account:edit')
    router.post('/user-accounts/edit-user-account',[determineUserRole, permissionEditUserAccount], (req, res, next) =>{
        const editUserAccount = createEditUserAccount(modules)
        editUserAccount(req.body, (err) =>{
            if(err) return next(err)
            res.sendStatus(201)
            next()
        })
    })
    server.use(router)
}