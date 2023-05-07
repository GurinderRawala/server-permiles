const express = require('express')
const { createAddBroker, createUpdateBroker, createGetBrokerList, createGetBrokerByName } = require('../../brokers')
const router = express.Router()

exports.registerRoutes = (server, modules) =>{
    const { authenticationMiddleware : { determineUserRole, permissions }, sessionHandler, validation } = modules
    const validateAddBroker = validation.brokerRoutesValidation('broker:add-broker')
    const permissionsAddBroker = permissions('broker:add-broker')
    router.post('/brokers/add-broker', 
        [sessionHandler, determineUserRole, permissionsAddBroker, validateAddBroker], 
        (req, res, next) => {
            if( validation.validationErrorMessage(req, res, next) ) return
            const addBroker = createAddBroker(modules)
            addBroker(req.body, (err, response) => {
                if( err ){ return next(err) }
                res.status(200).send(response)
                next()
            })
        })
    const validateUpdateBroker = validation.brokerRoutesValidation('broker:update-broker')
    const permissionsUpdateBroker = permissions('broker:update-broker')
    router.post('/brokers/update-broker', 
        [sessionHandler, determineUserRole, permissionsUpdateBroker, validateUpdateBroker], 
        (req, res, next) =>{
            if( validation.validationErrorMessage(req, res, next) ) return
            const updateBroker = createUpdateBroker(modules)
            updateBroker(req.body, (err, response) =>{
                if(err){ return next(err)}
                res.status(201).send(response)
                next()
            })
        })
    const permissionsGetBrokersList = permissions('broker:broker-list')
    router.get('/brokers/broker-list', 
        [sessionHandler, determineUserRole, permissionsGetBrokersList],
        (req, res, next) => {
            const getBrokersList = createGetBrokerList(modules)
            getBrokersList(req.body, (err, list) =>{
                if(err){ return next(err) }
                res.status(200).send(list)
                next()
            })
        })
    const validateGetBrokersByName = validation.brokerRoutesValidation('broker:by-name') 
    router.post('/brokers/by-name', 
        [sessionHandler, determineUserRole, permissionsGetBrokersList, validateGetBrokersByName],
        (req, res, next) =>{
            if( validation.validationErrorMessage(req, res, next) ) return
            const findBrokerByName = createGetBrokerByName(modules)
            findBrokerByName(req.body, (err, response) =>{
                if(err){ return next(err)}
                res.status(200).send(response)
                next()
            })
        }
    )
    server.use("/api", router)
}