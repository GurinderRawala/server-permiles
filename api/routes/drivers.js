const express = require('express');
const router = express.Router()
const { createAddDriver, createUpdateDriver, createGetDriver } = require('../../driver')

exports.registerRoutes = (server, modules) => {
    const { authenticationMiddlware : { determineUserRole, permissions } } = modules
    const permissionAddDriver = permissions('driver:add')
    router.post('/drivers/add-driver', [determineUserRole, permissionAddDriver] , (req, res, next) => {
        const addDriver = createAddDriver(modules)
        //Todo: translate req.body to Driver object
        addDriver(req.body, (err) => {
            if (err) { return next(err) }
            res.sendStatus(201)
            next()
        })
    })

    router.post('/drivers/update-driver', (req, res, next) => {
        const updateDriver = createUpdateDriver(modules)
        //Todo: translate req.body to Driver object
        updateDriver(req.body, (err) => {
            if (err) { return next(err) }
            res.sendStatus(201)
            next()
        })
    })

    router.get('/drivers/find-driver', (req, res, next) =>{
        const findDriver = createGetDriver(modules)
        findDriver(req.body, (err, driverList) => {
            if (err) { return next(err) }
            res.status(200).send({data: driverList})
            next()
        })
    })
    server.use(router)
}