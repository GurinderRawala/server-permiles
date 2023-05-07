const express = require('express');
const router = express.Router()
const { createInviteDriver, createUpdateDriver, createGetDriver, createGetDriverByEmail, createActiveDriverAccount, createResetPasswordDriver } = require('../../driver')

exports.registerRoutes = (server, modules) => {
    const { 
        authenticationMiddleware : { determineUserRole, permissions }, 
        validation, 
        sessionHandler,
        uploadMiddleware
    } = modules
    const permissionInviteDriver = permissions('driver:invite')
    const validateInviteDriver = validation.driverRoutesValidation('driver:invite')
    router.post('/drivers/invite-driver', 
        [ uploadMiddleware, sessionHandler, determineUserRole, permissionInviteDriver, validateInviteDriver ], 
        (req, res, next) => {
            const { validationErrorMessage } = validation
            if( validationErrorMessage(req, res, next) ) return
            const addDriver = createInviteDriver(modules)
            addDriver(req.body, req.files, (err, msg) => {
                if (err) { return next(err) }
                res.status(201).send(msg)
                next()
            })
        })
    const permissionEditDriver = permissions('driver:update')
    const validateDriverExits = validation.driverRoutesValidation('driver:update')
    router.post('/drivers/update-driver', 
        [sessionHandler, determineUserRole, permissionEditDriver, validateDriverExits], 
        (req, res, next) => {
            const { validationErrorMessage } = validation
            if( validationErrorMessage(req, res, next) ) return
            const updateDriver = createUpdateDriver(modules)
            updateDriver(req.body, (err, msg) => {
                if (err) { return next(err) }
                res.status(201).send(msg)
                next()
            })
        })
    const permissionGetDriver = permissions('driver:get-driver')
    const validateGetDriver = validation.driverRoutesValidation('driver:get-driver')
    router.get('/drivers/:email', 
        [sessionHandler, determineUserRole, permissionGetDriver, validateGetDriver],
        (req,res,next) =>{
            const { validationErrorMessage } = validation
            if( validationErrorMessage(req, res, next) ) return
            const findDriverByEmail = createGetDriverByEmail(modules)
            findDriverByEmail(req.params, (err, driver) =>{
                if(err){ return next(err) }
                res.status(200).send(driver)
                next()
            })
        })
    router.get('/drivers/:id', 
        [validateDriverExits],
        (req, res, next) =>{
            const { validationErrorMessage } = validation
            if( validationErrorMessage(req, res, next) ) return
            const getDriver = createGetDriver(modules)
            getDriver(req.params, (err, driver) => {
                if (err) { return next(err) }
                res.status(200).send({data: driver})
                next()
            })
        })
    const validationActivateDriver = validation.driverRoutesValidation('driver:activate')
    router.post('/drivers/activate', 
        [ validationActivateDriver ],
        (req, res, next) =>{
            if( validation.validationErrorMessage(req, res, next) ) return
            const activateDriverAccount = createActiveDriverAccount(modules)
            activateDriverAccount(req.body, (err, msg) =>{
                if(err){ return next(err)}
                res.status(201).send({msg})
                next()
            })
        })
    const validationResetPasswordDriver = validation.driverRoutesValidation('driver:reset-password')
    router.post('/drivers/reset-password', [validationResetPasswordDriver], (req, res, next) =>{
        if( validation.validationErrorMessage(req, res, next) ) return
        const resetPassword = createResetPasswordDriver(modules)
        resetPassword(req.body, (err, response) =>{
            if(err){ return next(err) }
            res.status(200).send(response)
            next()
        })
    })
    server.use("/api", router)
}