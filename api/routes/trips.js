const express = require('express')
const { createAddTrip, createUpdateTrip, createGetTripById, 
    createGetTripByTripNumber, createGetTripList } = require('../../trips')
const router = express.Router()

exports.registerRoutes = (server, modules)=>{
    const { authenticationMiddleware : { determineUserRole, permissions, uuidMiddleware }, sessionHandler, 
        validation, uploadMiddleware } = modules
    const permissionsAddTrip = permissions('trip:add-trip')
    const validateAddTrip = validation.tripRoutesValidation('trip:add-trip')
    router.post('/trips/add-trip', 
        [uploadMiddleware, sessionHandler, determineUserRole, permissionsAddTrip, uuidMiddleware, validateAddTrip],
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
    const permissionsGetTrip = permissions('trip:get-trip')
    router.get('/trips/:id', 
        [sessionHandler, determineUserRole, permissionsGetTrip, validateUpdateTrip],
        (req, res, next)=>{
            if( validation.validationErrorMessage(req, res, next) ) return
            const getTripById = createGetTripById(modules)
            getTripById(req.params, (err, trip) =>{
                if(err){ return next(err) }
                res.status(200).send(trip)
                next()
            })
        })
    const validateTripByTripNumber = validation.tripRoutesValidation('trip:by-tripId')
    router.post('/trips/by-tripId', 
        [sessionHandler, determineUserRole, permissionsGetTrip, validateTripByTripNumber],
        (req, res, next) =>{
            if( validation.validationErrorMessage(req, res, next) ) return
            const getTripByTripNumber = createGetTripByTripNumber(modules)
            getTripByTripNumber(req.body, (err, trip) => {
                if(err){ return next(err) }
                res.status(200).send(trip)
                next()
            })
        })
    router.post('/trips/trip-list', 
        [sessionHandler, determineUserRole, permissionsGetTrip],
        (req, res, next) => {
            const getTripList = createGetTripList(modules)
            getTripList(req.body, (err, list) => {
                if(err){ return next(err) }
                res.status(200).send(list)
                next()
            })
        })
   
    server.use("/api", router)
}