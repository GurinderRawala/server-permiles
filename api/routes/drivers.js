const express = require('express');
const router = express.Router()
const { createAddDriver, createUpdateDriver, createGetDriver } = require('../../driver')

exports.registerRoutes = (server, modules) => {
    const { authenticationMiddlware : { determineUserRole, permissions }, validation } = modules
    const permissionAddDriver = permissions('driver:create')
    const validateAddDriver = validation.driverRoutesValidation('driver:create')
    router.post('/drivers/add-driver', 
        [determineUserRole, permissionAddDriver, validateAddDriver], 
        (req, res, next) => {
            const { validationErrorMessage } = validation
            if( validationErrorMessage(req, res, next) ) return
            const addDriver = createAddDriver(modules)
            addDriver(req.body, (err, msg) => {
                if (err) { return next(err) }
                res.status(201).send(msg)
                next()
            })
        })
    const permissionEditDriver = permissions('driver:update')
    const validateDriverExits = validation.driverRoutesValidation('driver:update')
    router.post('/drivers/update-driver', 
        [determineUserRole, permissionEditDriver, validateDriverExits], 
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
    server.use(router)
}