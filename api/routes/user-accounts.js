const express = require('express');
const { createAddUserAccount, createUpdateUserAccount, createActivateUserAccount, createSignUpUserAccount, createSigninUserAccount } = require('../../user-account');
const router = express.Router()

exports.registerRoutes = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions }, sessionHandler, validation } = modules
    const permissionCreateUserAccount = permissions('user-account:create')
    const { clientRoutesValidation, userAccountValidation } = validation
    const validateCreateUserAccount = clientRoutesValidation('client:invite-user')
    router.post('/user-accounts/create-user-account',
        [sessionHandler, determineUserRole, permissionCreateUserAccount, validateCreateUserAccount], 
        (req, res, next) => {
            const { validationErrorMessage } = validation
            if( validationErrorMessage(req, res, next) ) return
            const addUserAccount = createAddUserAccount(modules)
            addUserAccount(req.body, (err, msg) => {
                if (err) { return next(err) }
                res.status(201).send(msg)
                next()
            })
        })
    const permissionUpdateUserAccount = permissions('user-account:update')
    const validationUpdateUserAccount = userAccountValidation('user-account:update')
    router.post('/user-accounts/update-user-account',
        [sessionHandler, determineUserRole, permissionUpdateUserAccount, validationUpdateUserAccount], 
        (req, res, next) =>{
            const { validationErrorMessage } = validation
            if( validationErrorMessage(req, res, next) ) return
            const updateUserAccount = createUpdateUserAccount(modules)
            updateUserAccount(req.body, (err, msg) =>{
                if(err){ return next(err) }
                res.status(201).send(msg)
                next()
            })
        })
    const permissionActivateUserAccount = permissions('user-account:activate')
    const validationActivateUserAccount = userAccountValidation('user-account:activate')
    router.post('/user-account/activate', 
        [sessionHandler, determineUserRole, permissionActivateUserAccount, validationActivateUserAccount], 
        (req, res, next) =>{
            const { validationErrorMessage } = validation
            if( validationErrorMessage(req, res, next) ) return
            const activeUserAccount = createActivateUserAccount(modules)
            activeUserAccount(req.body, (err, msg) =>{
                if(err){ return next(err)  }
                res.status(201).send(msg)
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

    const validateUserSignin =  userAccountValidation('user-account:signin')
    router.post('/user-account/signin', 
        [sessionHandler, validateUserSignin], 
        (req, res, next) => {
            const { validationErrorMessage } = validation
            if( validationErrorMessage(req, res, next) ) return
            const verifySignin = createSigninUserAccount(modules)
            verifySignin(req.body, (err, user) =>{
                console.log(err)
                if(err){ return next(err)}
                const { log } = modules
                log.info(req.session)
                req.session.user = {
                    id: user
                }
                res.status(200).send({msg: user})
                next()
            })
        })

    server.use(router)
}