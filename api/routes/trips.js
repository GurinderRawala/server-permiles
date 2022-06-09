const express = require('express')
const { createAddTrip, createUpdateTrip } = require('../../trips')
const router = express.Router()

exports.registerRoutes = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions }, sessionHandler, 
        validation, uploadMiddleware } = modules
    const permissionsAddTrip = permissions('trip:add-trip')
    const validateAddTrip = validation.tripRoutesValidation('trip:add-trip')
    router.post('/trips/add-trip', 
        [uploadMiddleware, sessionHandler, determineUserRole, permissionsAddTrip, validateAddTrip],
        (req, res, next) =>{
            if( validation.validationErrorMessage(req, res, next) ) return
            const addTrip = createAddTrip(modules)
            addTrip(req.body, req.files, (err, msg) =>{
                if(err){ return next(err)}
                res.status(201).send(msg)
                next()
            })
        })
    const permissionsUpdateTrip = permissions('trip:update-trip')
    const validateUpdateTrip = validation.tripRoutesValidation('trip:update-trip')
    router.post('/trips/update-trip', 
        [sessionHandler, determineUserRole, permissionsUpdateTrip, validateUpdateTrip],
        (req, res, next) =>{
            if( validation.validationErrorMessage(req, res, next) ) return
            const updateTrip = createUpdateTrip(modules)
            updateTrip(req.body, (err, msg) =>{
                if(err){ return next(err) }
                res.status(201).send(msg)
                next()
            })
        })
    server.use(router)
}