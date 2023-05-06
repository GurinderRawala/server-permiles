const express = require('express')
const { createAddLoad, createUpdateLoad, createGetLoadById, createGetLoadList, createGetLoadByLoadNumber } = require('../../loads')
const router = express.Router()
exports.registerRoutes = (server, modules) =>{
    const { authenticationMiddleware : { determineUserRole, permissions }, sessionHandler, 
        validation, uploadMiddleware } = modules
    const permissionsAddLoad = permissions('loads:add-load')
    const validateAddLoad = validation.loadRoutesValidation('loads:add-load')
    router.post('/loads/add-load', 
        [uploadMiddleware, sessionHandler, determineUserRole, permissionsAddLoad, validateAddLoad],
        (req, res, next) =>{
            if( validation.validationErrorMessage(req, res, next) ) return
            const addLoad = createAddLoad(modules)
            addLoad(req.body, req.files, (err, msg) =>{
                if(err){ return next(err)}
                res.status(201).send(msg)
                next()
            })
        })
    const permissionsUpdateLoad = permissions('loads:update-load')
    const validateUpdateLoad = validation.loadRoutesValidation('loads:update-load')
    router.post('/loads/update-load', 
        [sessionHandler, determineUserRole, permissionsUpdateLoad, validateUpdateLoad],
        (req, res, next) =>{
            if( validation.validationErrorMessage(req, res, next) ) return
            const updateLoad = createUpdateLoad(modules)
            updateLoad(req.body, (err, msg) => {
                if(err){ return next(err) }
                res.status(200).send(msg)
                next()
            })
        })
    const permissionsGetLoadById = permissions('loads:get-load')
    router.get('/loads/:id', 
        [sessionHandler, determineUserRole, permissionsGetLoadById, validateUpdateLoad],
        (req, res, next) =>{
            if( validation.validationErrorMessage(req, res, next) ) return
            const getLoadById = createGetLoadById(modules)
            getLoadById(req.params, (err, msg) =>{
                if(err){ return next(err) }
                res.status(201).send(msg)
                next()
            })
        })
    const permissionsGetLoadList = permissions('loads:load-list')
    router.post('/loads/load-list',
        [sessionHandler, determineUserRole, permissionsGetLoadList],
        (req, res, next) =>{
            const getLoadList = createGetLoadList(modules)
            getLoadList(req.body, (err, list) =>{
                if(err){return next(err)}
                res.status(200).send(list)
                next()
            })
        })
    const permissionsGetLoadByLoadId = permissions('loads:by-loadId')
    const validateGetLoadByLoadId = validation.loadRoutesValidation('loads:by-loadId')
    router.post('/loads/by-loadId', 
        [sessionHandler, determineUserRole, permissionsGetLoadByLoadId, validateGetLoadByLoadId],
        (req, res, next) =>{
            if( validation.validationErrorMessage(req, res, next) ) return
            const getLoadByLoadId = createGetLoadByLoadNumber(modules)
            getLoadByLoadId(req.body, (err, response) => {
                if(err){ return next(err)}
                res.status(200).send(response)
                next()
            })
        })
    server.use(router)
}