const express = require('express');
const { createAddUserAccount, createUpdateUserAccount, createActivateUserAccount, createSignUpUserAccount } = require('../../user-account');
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
    const permissionUpdateUserAccount = permissions('user-account:update')
    router.post('/user-accounts/update-user-account',[determineUserRole, permissionUpdateUserAccount], (req, res, next) =>{
        const editUserAccount = createUpdateUserAccount(modules)
        editUserAccount(req.body, (err) =>{
            if(err) return next(err)
            res.sendStatus(201)
            next()
        })
    })
    const permissionActivateUserAccount = permissions('user-account:activate')
    router.post('/user-account/activate', [determineUserRole, permissionActivateUserAccount], (req, res, next) =>{
        const activeUserAccount = createActivateUserAccount(modules)
        activeUserAccount(req.body, (err) =>{
            if(err){ return next(err) }
            res.sendStatus(201)
            next()
        })
    })

    router.get('/signup/:token', (req, res, next) => {
        const signUpUserAccount = createSignUpUserAccount(modules)
        const { params: { token } } = req
        signUpUserAccount(token, (err, data) => {
            if (err) { return next(err) }
            res.cookie('session', data);
            res.sendStatus(200)
            next()
        })
    })

    server.use(router)
}