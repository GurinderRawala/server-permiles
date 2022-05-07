const express = require('express');
const { createAddUserAccount, createUpdateUserAccount, createActivateUserAccount, createSignUpUserAccount } = require('../../user-account');
const router = express.Router()

exports.registerRoutes = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions }, sessionHandler } = modules
    const permissionCreateUserAccount = permissions('user-account:create')
    router.post('/user-accounts/create-user-account',[sessionHandler, determineUserRole, permissionCreateUserAccount], (req, res, next) => {
        const addUserAccount = createAddUserAccount(modules)
        addUserAccount(req.body, (err) => {
            if (err) { return next(err) }
            res.sendStatus(201)
            next()
        })
    })
    const permissionUpdateUserAccount = permissions('user-account:update')
    router.post('/user-accounts/update-user-account',[sessionHandler, determineUserRole, permissionUpdateUserAccount], (req, res, next) =>{
        const editUserAccount = createUpdateUserAccount(modules)
        editUserAccount(req.body, (err) =>{
            if(err) return next(err)
            res.sendStatus(201)
            next()
        })
    })
    const permissionActivateUserAccount = permissions('user-account:activate')
    router.post('/user-account/activate', [sessionHandler, determineUserRole, permissionActivateUserAccount], (req, res, next) =>{
        const activeUserAccount = createActivateUserAccount(modules)
        activeUserAccount(req.body, (err) =>{
            if(err){ return next(err) }
            res.sendStatus(201)
            next()
        })
    })

    router.get('/signup/:token',[sessionHandler], (req, res, next) => {
        const signUpUserAccount = createSignUpUserAccount(modules)
        const { params: { token } } = req
        signUpUserAccount(token, (err, data) => {
            if (err) { return next(err) }
            const { userId } = data
            req.session.user = { id: userId }
            res.sendStatus(200)
            next()
        })
    })

    //Temp API to set user sessions
    router.get('/signin/:userId', [sessionHandler], (req, res, next) => {
        req.session.user = {
            id: req.params.userId
        }
        res.sendStatus(200)
        next()
    })

    server.use(router)
}